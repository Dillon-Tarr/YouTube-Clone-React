export default function convertCommonHtmlEntities(string){
  let remainingString = string.slice();
  let correctedString = '';
  while (true){
    if (remainingString.includes('&')){
      let ampersandIndex = remainingString.indexOf('&');
      correctedString += remainingString.slice(0, ampersandIndex);
      remainingString = remainingString.slice(ampersandIndex);
      if (remainingString.slice(0, 7).includes(';')){
        let semicolonIndex = remainingString.indexOf(';');
        let entity = remainingString.slice(0, semicolonIndex + 1);
        entity = replaceEntity(entity);
        correctedString += entity;
        remainingString = remainingString.slice(semicolonIndex + 1);          
      }
      else{
        correctedString += remainingString.slice(0, 7);
        remainingString = remainingString.slice(7);
      }
    }
    else{
      correctedString += remainingString;
      return correctedString;
    }
  }
}

function replaceEntity(entity){
  switch(entity){
    case '&#32;':	  //Space
      return ' ';
    case '&#33;':	  //Exclamation mark
      return "!";
    case '&#34;':	  //Quotation mark
      return '"';
    case '&#35;':	  //Number sign
      return "#";
    case '&#36;':	  //Dollar sign
      return "$";
    case '&#37;':	  //Percent sign
      return "%";
    case '&#38;':	  //Ampersand
      return "&";
    case '&#39;':	  //Apostrophe
      return "'";
    case '&#40;':	  //Opening/Left Parenthesis
      return "(";
    case '&#41;':	  //Closing/Right Parenthesis
      return ")";
    case '&#42;':	  ////Asterisk
      return "*";
    case '&#43;':	  //Plus sign
      return "+";
    case '&#44;':	  //Comma
      return ",";
    case '&#45;':	  //Hyphen
      return "-";
    case '&#46;':	  //Period
      return ".";
    case '&#47;':	  //Slash
      return "/";
    case '&#58;':	  //Colon
      return ":";
    case '&#59;':	  //Semicolon
      return ";";
    case '&#60;':	  //Less-than
      return "<";
    case '&#61;':	  //Equals sign
      return "=";
    case '&#62;':	  //Greater than
      return ">";
    case '&#63;':	  //Question mark
      return "?";
    case '&#64;':	  //At sign
      return "@";
    case '&#91;':	  //Opening/Left square bracket
      return "[";
    case '&#92;':	  //Backslash
      return "\\";
    case '&#93;':	  //Closing/Right square bracket
      return "]";
    case '&#94;':	  //Caret
      return "^";
    case '&#95;':	  //Underscore
      return "_";
    case '&#96;':	  //Grave accent
      return "`";
    case '&#123;':	//Opening/Left curly brace
      return "{";
    case '&#124;':	//Vertical bar
      return "|";
    case '&#125;':	//Closing/Right curly brace
      return "}";
    case '&#126;':	//Tilde
      return "~";
    case '&#8211;':	//En dash
      return "–";
    case '&#8212;':	//Em dash
      return "—";
    default:
      return '�';
  }
}
