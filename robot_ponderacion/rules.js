module.exports = [
	/******************* Ingles **********************/
	{	name: "Sex or Porn 01",
		r: /(sexy?|porn|adult|xxx)\s?(chats?|cam|vr|tv|story|tube|videos?|party|games?|acts?|toy|comics?|movies?|dudes?)/ig,
		p: 20
	},
	{	name: "Sex or Porn 02",
		r: /(chats?|cam|vr|tv|story|tube|videos?|party|games?|acts?|toy|comics?|movies?|dudes?)[\s\-\_]?(sexy?|porn|adult)/ig,
		p: 20
	},
	{	name: "Boobs 01",
		r: /(big|biggest|huge|naked|monster|giant|amazing)[\s_\-\.]?(boobs|tits)/ig,
		p: 20
	},
	{	name: "Anal 01",
		r: /(anal|ass)[\s_\-\.]?(fucked|pleasure|sex|lover|creampie|fuck|dildo|penetration|milf|creampie)/ig,
		p: 40
	},
	{	name: "Anal 02",
		r: /(mom|teen|mature|casting|milf|granny|ebony|bbw|amateur|asian|hot|interracial)[\s_\-\.]?(anal|ass)/ig,
		p: 30
	},
	{	name: "Fisting 01",
		r: /(anal|pussy|extreme|vagina|ass)[\s_\-\.]?fisting/ig,
		p: 50
	},
	{	name: "Clasic hard words 01",
		r: /asshole|dildo|fucking|fuck|fucked|fisting|squirting|bondage|pissing|cumslut|fuckbutts|hentai|shemale|bondage|Cunnilingus|zoophilia|gangbang|deepthroats|bukkake|squirt(ing)?|bdms/ig,
		p: 50
	},
	{	name: "Clasic soft words 01",
		r: /pornstar|orgasm|pussy|mastur(bate|bating|bation)|nipple|handjob|orgy|escort|food\s?job|cameltoe|nude|pantyless|topless/ig,
		p: 10
	},
	{	name: "Brunette 01",
		r: /brunette\s?babes/ig,
		p: 40
	},
	{	name: "Clasic soft words 02",
		r: /[\s_\-\.](xxx|sex|porno|pornography|cun|ass|nudes|incest?)[\s_\-\.]/ig,
		p: 2
	},
	{	name: "Cock Dick 01",
		r: /(big|biggest|huge|naked|monster|giant|sucks?)[\s_\-\.]?(dick|cock)/ig,
		p: 40
	},
	{	name: "Blowjob 01",
		r: /(blowjob|Cocksuckers|cumshot|orgasm)/ig,
		p: 80
	},
	{	name: "Under 18 Age 01",
		r: /(under\sthe\sage\sof\s18|18\s?\+)/ig,
		p: 30
	},
	{	name: "Comman sites 01",
		r: /(bangbros|pornohub|fakehub)/ig,
		p: 30
	},
	{	name: "Restricted to adults 01",
		r: /restricted\sto\sadults|(site|page)\scontains\s(sexually|adult)\s((explicit|xxx)\s)?material/ig,
		p: 2000
	},
	{	name: "Playmate 01",
		r: /playmates?/ig,
		p: 30
	},
	{	name: "Live Sex 01",
		r: /live\ssex?/ig,
		p: 40
	},
	{	name: "Keywords 01",
		r: /name=\"keywords\"\scontent=\"(porn|sex|xxx)\"/ig,
		p: 400
	},




	/****************** Español *********************/

	{	name: "Sexo y Porno 01",
		r: /(sexo|pornografia)/ig,
		p: 5
	},
	{	name: "Mujeres 01",
		r: /(mujer(es)?|pendejas?|chicas?|putas?|putitas?)[\s_\-\.]?(desnudas?|en\spelotas|calientes?|en\sbolas|trolas?|follando|cogiendo|garchando|penetradas?|cogidas?|masturb)/ig,
		p: 30
	},
	{	name: "Videos e imagenes 01",
		r: /(im.gen(es)?|v.ideos?|libros?|historias?|clips?)[\s_\-\.]?(xxx|pornogr.ficos?|porno)/ig,
		p: 20
	},
	{	name: "mayor +18 01",
		r: /soy\smayor\sde\s18\sa.os/ig,
		p: 100
	},


	/*********************   Links to porn pages ****************/
	{	name: "Mension videos 01",
		r: /(pornhub|xvideos|xhamster|youporn|redtube|4tubemate.com|porntubemate|BangBros|Flirt4Free|Thug\sHunter|xnxx\.com|penthouse)/ig,
		p: 95
	},
	{	name: "Mension sites 01",
		r: /(playboy|adultfriendfinder|onlyfans|theporndude|brazzers|porndude)/ig,
		p: 60
	}

]
