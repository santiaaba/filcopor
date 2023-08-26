#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>
#include <db.h>

#define	DATABASE "fqdn_porn.db"


int main(int argc, char *argv[]){
	DB *dbp;
	int ret;

	if ((ret = db_create(&dbp, NULL, 0)) != 0) {
		fprintf(stderr, "db_create: %s\n", db_strerror(ret));
		exit (1);
	}
	ret = dbp->open(dbp,NULL, DATABASE, NULL, DB_BTREE, DB_CREATE, 0664);

	if (ret != 0){
		dbp->err(dbp, ret, "%s", DATABASE);
	}
	exit (0);
}
