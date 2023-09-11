DELIMITER //

drop procedure if exists findSeed;
create procedure findSeed()
/* Retorna ip fqdn como semilla entre los que
	se consideran pornográficos */
begin
	set @lastid = 0;
	set @randomValue = 0;

	select max(id) into @lastid from fqdn;
	select FLOOR( RAND() * @lastid) into @randomValue;
	select name from fqdn where id > @randomValue and isPorn = "yes" limit 1;
	if FOUND_ROWS() = 0 then
      signal SQLSTATE '45000'
      set message_text = 'No hay semilla';
   end if;
end //

drop procedure if exists load_ip;
create procedure load_ip()
begin
	select * from ip;
end //

drop procedure if exists search_domain;
create procedure search_domain(
	IN url varchar(200)
)
begin
	select domain,isPorn from fqdn where domain like CONCAT('%', url);
end //

drop procedure if exists add_report;
create procedure add_report(
	IN p_url varchar(200),
	IN p_type enum("falsoNeg","falsoPos"),
	IN p_id_user int unsigned
)
begin
	insert into reported(url,type,fecha,id_user) values(p_url,p_type,now(),p_id_user);
end //

drop procedure if exists login;
create procedure login(
	p_username varchar(200),
	p_pass varchar(100)
)
begin
	set @token = "";
	set @possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	set @i = 107;
	
	start transaction;
		make_token: loop
			set @token = concat(@token,substring(@possible,(rand() * 10000) mod 62,1));
			if @i = 0 then
				leave make_token;
			end if;
			set @i = @i - 1;
		end loop make_token;

		set @userid = null;
		set @expiration = timestampadd(hour,4,now());

		select id into @userid from user
		where username = p_username and passwd = SHA2(p_pass,'256')
		and status = 'active';

		if @userid is null then
			signal SQLSTATE '45000'
			set message_text = 'Error de Autenticación';
		else
			update user set token = @token, expiration = @expiration
			where id = @userid;

			select @token as token, @expiration as expiration;
      end if;
	commit;
end //

drop procedure if exists is_loging;
create procedure is_loging(
	p_token varchar(200)
)
begin
	set @expiration = null;
	set @idUser = null;

	select u.id, u.expiration into @idUser, @expiration
	from user u
	where u.token = p_token and u.status = 'active';

	if FOUND_ROWS() = 0 then
		signal SQLSTATE '45000'
			set message_text = 'Usuario no existe';
	end if;

	if now() > @expiration then
		update user set token=null where id = @idUser;
		signal SQLSTATE '45000'
			set message_text = 'Token expirado';
	end if;

	select @idUser as userid, @expiration as expiration;
end //


DELIMITER ;
