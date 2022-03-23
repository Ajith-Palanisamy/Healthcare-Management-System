var images=['/images/a.jpg','/images/b.jpg'];
var quotes=[' HEALTH IS THE GREATEST OF HUMAN BLESSINGS','HAPPINESS IS THE HIGHEST FORM OF HEALTH']
            var i=0;
            function change(){
                document.getElementById("main").src=images[i];
                document.getElementById("quote").innerHTML=quotes[i];
                if(i==1)
                i=0;
                else
                i++;
                setTimeout(change,3000);
            }
            window.onload=change();