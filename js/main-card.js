max_count = 255;

function count_words() {
  count = max_count-$("#textarea").val().length;
  if(count<0){
    $("#textarea").val($("#textarea").val().slice(0,max_count))
    count = 0
}
  if(count>0){
    $("#count").text('Доступно для ввода '+count+' из '+max_count+' символов');
  }
  else{
      if(count == 0){
        $("#count").text('Доступно для ввода '+count+' из '+max_count+' символов'); 
      }
    $('#textarea').keydown(function(e){
        if((e.key!='Backspace')&&(e.key!='ArrowUp')&&(e.key!='ArrowDown')&&(e.key!='ArrowLeft')&&(e.key!='ArrowRight') && count<=0){
            e.preventDefault()
        }
      });
      
  }
  
  
  
}

function show_skip_btn(){
    if(!ifWinner){
        $('.skip-wrapper').css({
            'animation':'1s  ease-in 0.1s 1 normal forwards running show',
        })
        $('.btn-skip').prop('disabled',false)
    }
    
}
function skip_game(){
    pieces[0]['animation'] = '1s  1 normal forwards running show'
    shuffled_pieces[0][0] = pieces[0]
    $('#00').css(shuffled_pieces[0][0])
    $('.game-wrapper').css({
            'animation':'1s  1 normal forwards running hide',
    })
    $('.win-image').css({
            'animation':'1s  ease-in 0.1s 1 normal forwards running show',
    })
    $('.opacity_mail').css({
            'animation':'2s  1 normal forwards running show',
    })
    $('.flip-container').addClass('flip')
    $('.btn').prop('disabled',false)
    $('.btn-skip').css({
        'animation':'1s  1 normal forwards running hide',
})
$('.btn-skip').prop('disabled',true)
        
    ifWinner = true
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }
function div_clicked(row,col){
    if(!ifWinner){
        if(!((row == blank_row_col['row']) && (col == blank_row_col['col']))){
            if((((row == blank_row_col['row']+1) || (row == blank_row_col['row']-1)) && (col == blank_row_col['col'])) || (((col == blank_row_col['col']+1) || (col == blank_row_col['col']-1)) && (row == blank_row_col['row']))){
                s = shuffled_pieces[row][col]
                shuffled_pieces[row][col] = shuffled_pieces[blank_row_col['row']][blank_row_col['col']]
                shuffled_pieces[blank_row_col['row']][blank_row_col['col']] = s
                $('#' + row + '' + col).css(
                    shuffled_pieces[row][col]
                )
                $('#' + blank_row_col['row'] + '' + blank_row_col['col']).css(
                    shuffled_pieces[blank_row_col['row']][blank_row_col['col']]
                )
                blank_row_col['row'] = row
                blank_row_col['col'] = col
               
                winning_actions()
                
            }
            else{
                
            }
        }
}
    
}
function winning_actions(){
    if(check_win()){
        pieces[0]['animation'] = '1s  1 normal forwards running show'
        shuffled_pieces[0][0] = pieces[0]
        $('#00').css(shuffled_pieces[0][0])
        $('.game-wrapper').css({
            'animation':'1s  1 normal forwards running hide',
        })
        $('.win-image').css({
            'animation':'1s  ease-in 0.1s 1 normal forwards running show',
        })
        $('.opacity_mail').css({
            'animation':'2s  1 normal forwards running show',
        })
        $('.flip-container').addClass('flip')
        $('.btn').prop('disabled',false)
        $('.btn-skip').css({
            'animation':'1s  1 normal forwards running hide',
    })
    $('.btn-skip').prop('disabled',true)
        ifWinner = true
    }
}
function check_win(){
    q=0
    for(i=0;i<rows;i++){
        for(j=0;j<cols;j++){
            if(shuffled_pieces[i][j]['background-image']!='none'){
                if(shuffled_pieces[i][j]['background-position'] != pieces[q]['background-position']){
                    return false
                }
            }
            
            q+=1
        }
    }
    return true
}
function send_message(){
    
    var lines = $('#textarea').val().replace(/^[\n\r]+|[\n\r]+$/g,'').split(/[\n\r]+/);
    text = ""
    for(i=0;i<lines.length;i++){
        text+=lines[i]+"%0A"
    }
    
    javascript:window.location='mailto:?subject=С днем работников нефтяной и газовой промышленности!&body='+text;
}
scale = 2
cols = 3
rows = 3
img_height = 915/scale
img_width = 1295/scale
$('.win-image').css(
    {
        'height':img_height,
        'width':img_width,
        
        
    }
)
$('.flipper').css(
    {
        'height':img_height+10,
        'width':img_width+9
    }
)
$('.flip-container').css(
    {
        'height':img_height+30,
        'width':img_width+30
    }
)
$('#textarea').css(
    { 
        'width':img_width+20
    }
)
$('#form').css(
    { 
        'width':img_width+30
    }
)
$('.btn').prop('disabled',true)
$('.skip-wrapper').css(
    { 
        'width':img_width+30
    }
)

pieces = []
shuffled_pieces = []
elems = []
ifWinner = false
for(i=0;i<rows;i++){
    pieces.push([])
    for(j=0;j<cols;j++){
        elems.push(
            {
                'background-image':'url(img/e-card_front.jpg)', 
                'height':img_height/rows+'px',
                'width':img_width/cols+'px',
                'display':'inline-block',
                'background-position':(img_width - j * (img_width/cols)) + 'px ' + (img_height - i * (img_height/rows)) + 'px',
                'background-size':img_width + 'px ' + img_height + 'px',
                'border':'1px solid #009245',
                'margin':'0.5px'
                
                
               
            }
        )  
    }
    
}
pieces = elems.slice()

elems.shift()

shuffle(elems)
elems.unshift(
    {
        'background-image':'url(img/e-card_front.jpg)', 
        'height':img_height/rows+'px',
        'width':img_width/cols+'px',
        'display':'inline-block',
        'background-position':(img_width - j * (img_width/cols)) + 'px ' + (img_height - i * (img_height/rows)) + 'px',
        'background-color':'white',
        'background-image':'none',
        'background-scale':img_width + 'px ' + img_height + 'px',
        'border':'1px solid #009245',
        'margin':'0.5px',
        
    }     
)
q = 0
for (i=0;i<rows;i++){
    shuffled_pieces.push([])
    for(j=0;j<cols;j++){
        shuffled_pieces[i].push(elems[q])
        q+=1
    }
}







blank_row_col = {
    'row':0,
    'col':0
}

for(i=0;i<rows;i++){
    for(j=0;j<cols;j++){
        $('.game-wrapper').append(
            '<div onclick = "div_clicked('+i+','+j+')" id = "'+i+''+j+'"</div>'
        )
        $('#'+i+''+j).css(shuffled_pieces[i][j])
    }
    $('.game-wrapper').append(
        '<br>'
    )
}
$('.app-wrapper').css('opacity',1)
setTimeout(show_skip_btn,120000)
winning_actions()





