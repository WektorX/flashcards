<?php
    header('Access-Control-Allow-Origin: *');
    $xml = simplexml_load_file('kurs.xml', NULL, LIBXML_NOCDATA);
    

    if(isset($_GET['do']) && $_GET['do']==1){
        $result = $xml->xpath('//kurs');
        echo json_encode($result);
    }else if(isset($_GET['do']) && $_GET['do']==2){
        $lekcja = $_GET['lekcja'];
        $result = $xml->xpath('//kurs/lekcja [@nr="'.$lekcja.'"]/*');      
        echo json_encode($result);
    
    }
    else if(isset($_GET['do']) && $_GET['do']==3){
        $which = $_GET['which'];
        $result = $xml->xpath('//kurs/lekcja [@nr="'.$which.'"]');      
       
        if ( ! empty($result)) {
            unset($result[0][0]);
        }
        $formatted =$xml->asXML();
        $file = fopen ('kurs.xml', "w"); 
        fwrite($file, $formatted); 
        fclose ($file);
    
    }
    else if(isset($_GET['do']) && $_GET['do']==4){
        $nr  = $_GET['nr'];
        $nazwa = $_GET['name'];
        $cs = $xml->addChild('lekcja','');
        
        $cs->addAttribute('nr',$nr);
        $cs->addAttribute('nazwa',$nazwa);
   

        $formatted =$xml->asXML();
        $file = fopen ('kurs.xml', "w"); 
        fwrite($file, $formatted); 
        fclose ($file);
    
    }
    else if(isset($_GET['do']) && $_GET['do']==5){
        $which = $_GET['which'];
        $nazwa = $_GET['name'];
        $result = $xml->xpath('//kurs/lekcja [@nr="'.$which.'"]'); 

       
        if($result[0]['nazwa']!=null){
            $result[0]['nazwa'] = $nazwa;
        }
        else{
            $result[0]->addAttribute('nazwa', $nazwa);
        }
     //   $result->removeAttribute('nazwa');
        

        $formatted =$xml->asXML();
        $file = fopen ('kurs.xml', "w"); 
        fwrite($file, $formatted); 
        fclose ($file);
    
    }
    else if(isset($_GET['do']) && $_GET['do']==6){
        $slowo = $_GET['pl'];
        $result = $xml->xpath('//pl [text() = "'.$slowo.'" ]/..');      
        

        if ( ! empty($result)) {
            unset($result[0][0]);
        }
        $formatted =$xml->asXML();
        $file = fopen ('kurs.xml', "w"); 
        fwrite($file, $formatted); 
        fclose ($file);
    
    }
    else if(isset($_GET['do']) && $_GET['do']==7){
        $pl = $_GET['pl'];
        $en = $_GET['en'];
        $nr = $_GET['nr'];
        $result = $xml->xpath('//kurs/lekcja [@nr="'.$nr.'"]');     
        
        $cs = $result[0]->addChild('slowo','');
        $pol = $cs->addChild('pl',$pl);
        $eng = $cs->addChild('en',$en);


        $formatted =$xml->asXML();
        $file = fopen ('kurs.xml', "w"); 
        fwrite($file, $formatted); 
        fclose ($file);
    
    }



    else {

        echo "beka";
    }
?>