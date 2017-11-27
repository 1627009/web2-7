onload = function(){
  //canvasエレメントを取得
  var c = document.getElementById('canvas');
  c.width = 500;
  c.height = 300;
  
  //webglコンテキストを取得
  var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
  
  //頂点シェーダーとフラグメントシェーダーの生成
  var v_shader = create_shader('vs');
  var f_shader = create_shader('fs');
  
  //プログラムオブジェクトの生成とリンク
  var prg = create_program(v_shader, f_shader);
  
  //attributeLocationを配列に取得
  var attLocation = new Array(2);
  attLocation[0] = gl.getAttribLocation(prg, 'position');
  attLocation[1] = gl.getAttribLocation(prg, 'color');
  
  //atributeの要素数を配列に格納
  var attStride = new Array(2);
  attStride[0] = 3;
  attStride[1] = 4;
  
  //頂点属性を格納する配列
  var position = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
   -1.0, 0.0, 0.0
  ];
  var color = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
  ];
  
  //VBOの生成
  var pos_vbo = create_vbo(position);
  var col_vbo = create_vbo(color);
  
  //VBOを登録する
  set_attribute([pos_vbo, col_vbo], attLocation, attStride);
  
  //uniformLocationの取得
  var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');
  
  //minMatrix.jsを用いた行列関数処理
  //matIVオブジェクトを生成
  var wMatrix = m.identity(m.create());
  var vMatrix = m.identity(m.create());
  var pMatrix = m.identity(m.create());
  var vpMatrix = m.identity(m.create());
  var wvpMatrix = m.identity(m.create());
  
  //ビュー×プロジェクション座標返還行列
  m.lookAt([0.0, 0.0, 5.0], [0, 0, 0], [0, 1, 0], vMatrix);//カメラ位置、注視点、上方向
  m.perspective(45, c.width / c.height, 0.1, 100, pMatrix);//画角　アスペクト比、近クリップ面、遠方クリップ面
  m.multiply(pMatrix, vMatrix, vpMatrix);
  
  //カウンタの宣言
  var count = 0;
  
  //恒常ループ
  (function(){
    //canvasを初期化
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    //カウンターをもとにラジアンを算出
  })
}
