DELIMITER //

drop procedure if exists findSeed;
create procedure findSeed()
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

DELIMITER ;
