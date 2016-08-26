<?php
$id= $_GET['id'];
if($id!=="" && $id<10){
	$arr=[];
	for($i=1;$i<=10;$i++){
		$arr[$i]['areaname']='areaname:'.$i;
		if($i===10){
			$arr[$i]['areaname']='最后一层（在后面不再生成列表）';
		}
	}
	echo json_encode(['state'=>'1','data'=>$arr]);
}else{
	echo json_encode(['state'=>'0']);
}

