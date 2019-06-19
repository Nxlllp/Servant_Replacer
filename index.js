const DEFAULT_HOOK_SETTINGS = {order: -1000000, filter: {fake: false}};

module.exports = function Servant(mod) {
	let enabled = true;
	var power = 1132; //def 34
	var	numm = 1098; // +3
	let gameId;
    mod.hook('S_REQUEST_SPAWN_SERVANT', 1, DEFAULT_HOOK_SETTINGS, event => {
        gameId = event.gameId;
    });
		
	mod.command.add('servant', () => {
	if(enabled){
		enabled = false;
		mod.command.message('Servant module off');
	}
	else{
		enabled = true;
		mod.command.message('Servant module on');
	}
	});
	
	mod.command.add('pow', (num) => {
		if(2 < num && num <= 40){
			mod.command.message(`${num} Sets`);
			power = Number(num) + numm;
		}
		else{
			mod.command.message(`Error`);
		}
	});
	
	mod.command.add('skill', (num) => {
			mod.command.message(`${num} Sets`);
			power = num;
	});		

	for(let msg of ['C_START_SERVANT_ACTIVE_SKILL']) 
		mod.hook(msg, 1, {order: 100}, (event) => {
		if (!enabled) return;
		event.Id = power;
		return true;
			});
}