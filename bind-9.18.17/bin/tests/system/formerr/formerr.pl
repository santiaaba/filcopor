#!/usr/bin/perl

# Copyright (C) Internet Systems Consortium, Inc. ("ISC")
#
# SPDX-License-Identifier: MPL-2.0
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0.  If a copy of the MPL was not distributed with this
# file, you can obtain one at https://mozilla.org/MPL/2.0/.
#
# See the COPYRIGHT file distributed with this work for additional
# information regarding copyright ownership.

# This is a tool for sending an arbitrary packet via UDP or TCP to an
# arbitrary address and port.  The packet is specified in a file or on
# the standard input, in the form of a series of bytes in hexadecimal.
# Whitespace is ignored, as is anything following a '#' symbol.
#
# For example, the following input would generate normal query for
# isc.org/NS/IN":
#
#     # QID:
#     0c d8
#     # header:
#     01 00 00 01 00 00 00 00 00 00
#     # qname isc.org:
#     03 69 73 63 03 6f 72 67 00
#     # qtype NS:
#     00 02
#     # qclass IN:
#     00 01
#
# Note that we do not wait for a response for the server.  This is simply
# a way of injecting arbitrary packets to test server resposnes.
#
# Usage: packet.pl [-a <address>] [-p <port>] [-t (udp|tcp)] [filename]
#
# If not specified, address defaults to 127.0.0.1, port to 53, protocol
# to udp, and file to stdin.
#
# XXX: Doesn't support IPv6 yet

require 5.006_001;

use strict;
use Getopt::Std;
use IO::File;
use IO::Socket;

sub usage {
    print ("Usage: packet.pl [-a address] [-p port] [file]\n");
    exit 1;
}

my %options={};
getopts("a:p:", \%options);

my $addr = "127.0.0.1";
$addr = $options{a} if defined $options{a};

my $port = 53;
$port = $options{p} if defined $options{p};

my $file = "STDIN";
if (@ARGV >= 1) {
    my $filename = shift @ARGV;
    open FH, "<$filename" or die "$filename: $!";
    $file = "FH";
}

my $input = "";
while (defined(my $line = <$file>) ) {
    chomp $line;
    $line =~ s/#.*$//;
    $input .= $line;
}

$input =~ s/\s+//g;
my $data = pack("H*", $input);
my $len = length $data;

my $output = unpack("H*", $data);
print ("sending: $output\n");

my $sock = IO::Socket::INET->new(PeerAddr => $addr, PeerPort => $port,
				 Proto => "tcp") or die "$!";

my $bytes;
$bytes = $sock->syswrite(pack("n", $len), 2);
$bytes = $sock->syswrite($data, $len);
$bytes = $sock->sysread($data, 2);
$len = unpack("n", $data);
$bytes = $sock->sysread($data, $len);
print "got: ", unpack("H*", $data). "\n";

$sock->close;
close $file;
