(function ($) {
	$.select=function(config){
		var i=new select;
		return i.init(config)
	}
	//声明多级联动 方法类
	var select = new Function();
	select.prototype={
		//定义类属性
		init:function(config){
			/**
			 * 这些是预定义属性
			 */
			this.boxName='box';				//容器名
			this.className='area';  		//每个事件的定位class
			this.url='./area.php';          //默认选项

			//this.classObj=$("."+className); //每个事件的定位class 的对象 --基本没用所以废除了
			this.type= 'get';				//传输方式
			this.dataType='json'; 			//使用jsonp方式
			
			//解包解出配置信息 覆盖上面的属性
			for(var key in config){
				this[key] = config[key];
				//console.log(key+':'+config[key]+' this.key:'+this.key);
			}
			//console.log(this.boxName);
			
			var boxName=this.boxName;
			this.box=$('#'+boxName);		//需要添加元素的容器
			
			//最后创建
			this.create();					//新建一个select获取 
		},
		
		create:function(){
			//声明外部变量
			var boxName=this.boxName;
			var className= this.className;
			var box=this.box;
			var url=this.url;
			var obj=this;
			var type=this.type;
			var dataType=this.dataType;
			
			
			$.ajax({
			  type: type,
			  dataType:dataType,
			  url: url,
			  data: {id:'0'},
			  sync: true,//设置异步模式
			  success: function(data){
				var option="<option value=''>请选择</option>";
				var list=data.data;
				for(var key in list){
					option+="<option value='"+key+"'>"+list[key].areaname+"</option>";
				}
				$('<div class="col-md-2 pl0"><select name="'+className+'[]" num="0" class="form-control input-sm '+className+'">'+option+'</select></div>').appendTo(box).find('select').bind('change',function(){obj.change($(this))});
			  }
		   });
			
		},
		
		//change事件
		change:function(event){
			//声明 

			var box =this.box;					//获取所有插入盒子的对象
			var className=this.className		//获取模型的className
			
			var classObj=$('.'+className);		//获取所有Class所在元素组 这里要在注意 重新生成classObj 因为他是动态的
			var num=classObj.index($(event))+1; //获取num的值
			//console.log(classObj.index($(event)));
			
			var id=$(event).val();				//获取ajax发送id的头
			var obj=this;						//代表这个方法			
			var url=this.url;					//url地址			
			
			var type = this.type;				//传输方式
			var dataType=this.dataType;			//数据类型
			
			//清除 后续添加的新的元素
			classObj.each(function(){
				//console.log(event);
				//这里的this 代表eClass 遍历时的单个对象
				if($(this).attr('num')>$(event).attr('num')){
					$(this).parent().remove();
				}
			});

			//循环ajax方法
			$.ajax({
			  type: type,
			  dataType:dataType,
			  url: url,
			  data: {id:id},
			  sync: true,//设置异步模式
			  success: function(data){
				//console.log(data);
				var list =data.data
				if(data.state==='1'){
					var option="<option value=''>请选择</option>";
					for(var key in list){
						option+="<option value='"+key+"'>"+list[key].areaname+"</option>";
					}
					$('<div class="col-md-2 pl0"><select name="'+className+'[]" num="'+num+'" class="form-control input-sm '+className+'" >'+option+'</select></div>').appendTo(box).find('select').bind('change',function(){obj.change(this)});
				 }
			  }
		   });
		   
		},
		
		//查询当前盒子中的信息
		log:function(){
			var boxName=$(event).attr('pnode');  //获取触发事件者的pnode 
			var className=$(event).attr('cname');//获取触发事件者的cname
			var box =$("#"+boxName);			//获取所有插入盒子的对象
			var className=$("."+className);		//获取所有Class所在元素组
			console.log("容器名:"+boxName+"\n 触发的class名:"+className);
		},
		
	}
	
})(jQuery)