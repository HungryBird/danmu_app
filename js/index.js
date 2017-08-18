$(function(){
	var ref = new Wilddog('https://danmu-app-fcc.wilddogio.com/');

	$('#btnSubmit').on('click',function(){
		dmSubmit();
	})

	$('#btnClear').on('click',function(){
		dmClear();
	})

	$(document).on('keydown',function(e){
		if( e.keyCode === 13 ) {
			dmSubmit();
		}
	})

	var selColor = function(min,max) {
		var Range = max - min - 1
		,Rand = Math.random()
		,num = min + Math.round(Rand * Range); //四舍五入最大值Max,最小值min
		return num;
	}

	var storeDm = []
	,dmKey = 0;

	var getDm = function() {
		ref.on('child_added',function(data){
			var dmVal = data.val()
			,color = ['dmColor1','dmColor2','dmColor3','dmColor4','dmColor5','dmColor6','dmColor7']
			,minColor = 0
			,maxColor = color.length
			,colorNum = selColor(minColor,maxColor)
			,dmSpan = $('<span class="dm dm-shadow ' + color[colorNum] + '"></span>')
			,dm = dmSpan.text(data.val());
			storeDm.push(dm);
		})
	}
	getDm();

	var routine = function() {
		startMove(storeDm[dmKey]);
		dmKey++;
		if ( dmKey<storeDm.length ) {
			setTimeout(routine,300);
		}
	}
	setTimeout(routine,1000);

	var dmSubmit = function() {
		var dmVal =$('#dmInput').val();
		if( dmVal !== '' ) {
			ref.push(dmVal);
			var usDm = $('<span class="user-dm dm"></span>').text(dmVal);
			startMove(usDm);
			$('#dmInput').val('');
		}
	}

	var randomInt = function (wallHeight) {
		var rmInt = Math.floor(Math.random()*wallHeight);
		if( rmInt === 0 ) {
			randomInt(wallHeight)
		} else {
			return rmInt;
		}
	}

	var startMove = function(dm) {
		if( !dm ) {
			return;
		}
		var wallWidth = $('#dmWall').outerWidth()
		,wallHeight = $('#dmWall').height()
		,time = 5000;
		$('#dmWall').append(dm);
		var dmWidth = dm.outerWidth()
		,dmHeight = dm.outerHeight();
		var _top = randomInt(wallHeight) - dmHeight;
		_top > 0 ? _top : _top = 10;
		dm.css({
			left: wallWidth,
			top: _top
		})
		dm.animate({
			left: - dmWidth
		},time,'linear',function(){
			dm.remove()
		})
	}

	var dmClear = function() {
		$('#dmWall').empty();
		storeDm = [];
	}

})