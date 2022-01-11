let inputNo;
let types = [];
let outJson;
let outGen;
let outXML;

function build() {
  buildGen();
  buildJson();
  buildXML();
  console.log(outJson);
  console.log(outGen);
  console.log(outXML);
}

function buildGen() {
  let ins = "";
  for (i = 1; i <= inputNo; i++) {
    let inputName = document.getElementById(`input_name${i}`).value;
    let varName = document.getElementById(`var_name${i}`).value;
    let field = `\nfield${i} = block.getFieldValue(${varName});`;
    let input = `\ninput${i} = Blockly.JavaScript.valueToCode(block, ${inputName}, Blockly.JavaScript.ORDER_ATOMIC);`;
    ins += field;
    ins += input;
  }
  let code = document.getElementById("code_input").value;
  let name = document.getElementById("block_name").value;
  let outfunc = `Blockly.Javascript[${name}] = function(block) {${ins}\n${code}\nlet code = "";\nreturn code;\n}`;
  outGen = outfunc;
}

function buildXML() {
  let inputs = "";
  for (i = 1; i <= inputNo; i++) {
    let varName = document.getElementById(`var_name${i}`).value;
    let type = document.getElementById(`field_type${i}`).value;
    let input = "";
    if (type == "field_dropdown") {
      input = `<field name=${varName}></field>`;
    } else {
      let text = document.getElementById(`text${i}`).value;
      input = `<field name=${varName}>${text}</field>`;
    }
    inputs = `${inputs}\n${input}`;
  }
  let name = document.getElementById("block_name").value;
  let outXml = `<xml xmlns="http://www.w3.org/1999/xhtml">\n<block type=${name}>${inputs}\n</block></xml>`;
  outXML = outXml;
}

function buildJson() {
  let name = document.getElementById("block_name").value;
  let inputs = document.getElementById("inputs").value;
  let connections = document.getElementById("connections").value;
  let tooltip = document.getElementById("tooltip").value;
  let helpURL = document.getElementById("help_url").value;
  let colour = document.getElementById("colour").value;
  let json = {
    type: name,
    message0: "",
    args0: [],
    colour: colour,
    tooltip: tooltip,
    helpUrl: helpURL,
  };

  let count = 1;

  for (i = 0; i <= types.length - 1; i++) {
    let inType = document.getElementById(`input_type${i + 1}`).value;
    let inputName = document.getElementById(`input_name${i + 1}`).value;
    let field_pos = document.getElementById(`field_pos${i + 1}`).value;
    let type = document.getElementById(`type${i + 1}`).value;
    let field_type = document.getElementById(`field_type${i + 1}`).value;
    let inp = {
      type: inType,
      name: inputName,
    };
    if (type == "any") {
      null;
    } else {
      inp["check"] = type;
    }
    if (field_pos == "false") {
      null;
    } else {
      inp["align"] = field_pos;
    }
    json.args0.push(inp);
    json["message0"] = `${json["message0"]} %${count}`;
    count++;
    let field = {};
    console.log(`jsntyp ${inType}`);
    switch (field_type) {
      case "text":
        let txt = document.getElementById(`text${i + 1}`).value;
        json["message0"] = `${json["message0"]} %${txt}`;
        break;
      case "field_label_serializable":
        let txt1 = document.getElementById(`text${i + 1}`).value;
        let text_var = document.getElementById(`var_name${i + 1}`).value;
        let msg = json["message0"];
        // console.log(msg);
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = text_var;
        field["text"] = txt1;
        json.args0.push(field);
        break;
      case "field_input":
        let txt2 = document.getElementById(`text${i + 1}`).value;
        let text_var1 = document.getElementById(`var_name${i + 1}`).value;
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = text_var1;
        field["text"] = txt2;
        json.args0.push(field);
        break;
      case "field_number":
        let txt3 = document.getElementById(`text${i + 1}`).value;
        let text_var2 = document.getElementById(`var_name${i + 1}`).value;
        let min = document.getElementById(`min${i + 1}`).value;
        let max = document.getElementById(`max${i + 1}`).value;
        let precision = document.getElementById(`precision${i + 1}`).value;
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = text_var2;
        field["value"] = parseInt(txt3);
        if (min == "") {
          null;
        } else {
          field["min"] = parseInt(min);
        }
        if (max == "") {
          null;
        } else {
          field["max"] = parseInt(max);
        }
        if (precision == "") {
          null;
        } else {
          field["precision"] = parseInt(precision);
        }
        json.args0.push(field);
        break;
      case "field_angle":
        let angle = document.getElementById(`text${i + 1}`).value;
        let text_var3 = document.getElementById(`var_name${i + 1}`).value;
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = text_var3;
        field["angle"] = angle;
        json.args0.push(field);
        break;
      case "field_dropdown":
        let amt = document.getElementById("dd_amt").value;
        let text_var4 = `select${i + 1}`;
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = text_var4;
        field["options"] = [];
        for (q = 1; q <= amt; q++) {
          console.log(`option ${i + 1}-${q}`);
          let option = document.getElementById(`option${i + 1}-${q}`).value;
          let op_var = document.getElementById(`option_var${i + 1}-${q}`).value;
          let op = [option, op_var];
          field["options"].push(op);
        }
        json.args0.push(field);
        break;
      case "field_checkbox":
        let check = document.getElementById(`text${i + 1}`).value;
        let text_var5 = document.getElementById(`var_name${i + 1}`).value;
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = text_var5;
        field["checked"] = check;
        json.args0.push(field);
        break;
      case "field_colour":
        let colour = document.getElementById(`text${i + 1}`).value;
        let colour_var = document.getElementById(`var_name${i + 1}`).value;
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = colour_var;
        field["colour"] = colour;
        json.args0.push(field);
        break;
      case "field_variable":
        let item = document.getElementById(`text${i + 1}`).value;
        let item_var = document.getElementById(`var_name${i + 1}`).value;
        json["message0"] = `${json["message0"]} %${count}`;
        count++;
        field["type"] = field_type;
        field["name"] = item_var;
        field["variable"] = item;
        json.args0.push(field);
        break;
    }
  }
  outJson = json;
}

function inGen() {
  console.log("heyyy");
  inputNo = document.getElementById("input_amt").value;
  let in_div = document.createElement("div");
  for (i = 1; i <= inputNo; i++) {
    console.log("heyyy inside");
    let div = document.createElement("div");
    let select1 = document.createElement("select");
    select1.id = `input_type${i}`;
    let value = document.createElement("option");
    value.value = "input_value";
    value.innerHTML = "value";
    let statement = document.createElement("option");
    statement.value = "input_statement";
    statement.innerHTML = "statement";
    let dummy = document.createElement("option");
    dummy.value = "input_dummy";
    dummy.innerHTML = "dummy";
    select1.appendChild(value);
    select1.appendChild(statement);
    select1.appendChild(dummy);

    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.id = `input_name${i}`;
    let iNameLab = document.createElement("label");
    iNameLab.setAttribute("for", `input_name${i}`);

    let select2 = document.createElement("select");
    select2.id = `field_pos${i}`;
    let left = document.createElement("option");
    left.value = "false";
    left.innerHTML = "left";
    let right = document.createElement("option");
    right.value = "RIGHT";
    right.innerHTML = "right";
    let center = document.createElement("option");
    center.value = "CENTER";
    center.innerHTML = "center";
    select2.appendChild(left);
    select2.appendChild(right);
    select2.appendChild(center);

    let select3 = document.createElement("select");
    select3.id = `type${i}`;
    let any = document.createElement("option");
    any.value = "any";
    any.innerHTML = "any";
    let bool = document.createElement("option");
    bool.value = "bool";
    bool.innerHTML = "bool";
    let number = document.createElement("option");
    number.value = "number";
    number.innerHTML = "number";
    let string = document.createElement("option");
    string.value = "string";
    string.innerHTML = "string";
    let array = document.createElement("option");
    array.value = "array";
    array.innerHTML = "array";
    select3.appendChild(any);
    select3.appendChild(bool);
    select3.appendChild(number);
    select3.appendChild(string);
    select3.appendChild(array);

    let select4 = document.createElement("select");
    select4.id = `field_type${i}`;
    let text = document.createElement("option");
    text.value = "text";
    text.innerHTML = "text";
    let textSer = document.createElement("option");
    textSer.value = "field_label_serializable";
    textSer.innerHTML = "textSer";
    let textInput = document.createElement("option");
    textInput.value = "field_input";
    textInput.innerHTML = "textInput";
    let numPad = document.createElement("option");
    numPad.value = "field_number";
    numPad.innerHTML = "numPad";
    let angleInput = document.createElement("option");
    angleInput.value = "field_angle";
    angleInput.innerHTML = "angleInput";
    let dropdown = document.createElement("option");
    dropdown.value = "field_dropdown";
    dropdown.innerHTML = "dropdown";
    let checkbox = document.createElement("option");
    checkbox.value = "field_checkbox";
    checkbox.innerHTML = "checkbox";
    let colour = document.createElement("option");
    colour.value = "field_colour";
    colour.innerHTML = "colour";
    let variable = document.createElement("option");
    variable.value = "field_variabl";
    variable.innerHTML = "variable";
    let image = document.createElement("option");
    image.value = "field_image";
    image.innerHTML = "image";
    select4.appendChild(text);
    select4.appendChild(textSer);
    select4.appendChild(textInput);
    select4.appendChild(numPad);
    select4.appendChild(angleInput);
    select4.appendChild(dropdown);
    select4.appendChild(checkbox);
    select4.appendChild(colour);
    select4.appendChild(variable);
    select4.appendChild(image);

    div.style.padding = "0.25%";
    div.appendChild(select1);
    div.appendChild(iNameLab);
    div.appendChild(inputName);
    div.appendChild(select2);
    div.appendChild(select3);
    div.appendChild(select4);

    in_div.appendChild(div);
  }
  let butt = document.createElement("button");
  butt.innerHTML = "get fields";
  butt.onclick = function () {
    getFields();
  };
  in_div.appendChild(butt);
  let temp = document.getElementById("inputs_div");
  temp.appendChild(in_div);
}

function dropSet(index, divv) {
  let amt = document.getElementById("dd_amt").value;
  let num = document.getElementById("dd_amt");
  let butt = document.getElementById("dd_butt");
  num.style.display = "none";
  butt.style.display = "none";
  let div = document.createElement("div");
  div.style.padding = "0.5%";
  let br = document.createElement("br");
  for (i = 1; i <= amt; i++) {
    let label21 = document.createElement("p");
    label21.innerHTML = "option / var name";
    let input2 = document.createElement("input");
    input2.type = "text";
    input2.id = `option${index - 1}-${i}`;
    let variable1 = document.createElement("input");
    variable1.type = "text";
    variable1.id = `option_var${index - 1}-${i}`;
    div.appendChild(label21);
    div.appendChild(input2);
    div.appendChild(variable1);
    div.appendChild(br);
  }
  document.getElementById("ffff_div").appendChild(div);
}

function getFields() {
  let fields_div = document.createElement("div");
  for (i = 1; i <= inputNo; i++) {
    let inputCnt = document.createElement("p");
    inputCnt.innerHTML = `input ${i}`;
    let type = document.getElementById(`field_type${i}`).value;
    console.log(type);
    types.push(type);
    let div = document.createElement("div");
    div.appendChild(inputCnt);
    switch (type) {
      case "text":
        let label = document.createElement("p");
        label.innerHTML = "text";
        let input1 = document.createElement("input");
        input1.type = "text";
        input1.id = `text${i}`;
        div.appendChild(label);
        div.appendChild(input1);
        break;
      case "field_label_serializable":
        let label1 = document.createElement("p");
        label1.innerHTML = "text / var name";
        let input2 = document.createElement("input");
        input2.type = "text";
        input2.id = `text${i}`;
        let label2 = document.createElement("p");
        label2.innerHTML = "var name";
        let variable1 = document.createElement("input");
        variable1.type = "text";
        variable1.id = `var_name${i}`;
        div.appendChild(label1);
        div.appendChild(input2);
        // div.appendChild(label2);
        div.appendChild(variable1);
        break;
      case "field_input":
        let label3 = document.createElement("p");
        label3.innerHTML = "text / var name";
        let input3 = document.createElement("input");
        input3.type = "text";
        input3.id = `text${i}`;
        let variable2 = document.createElement("input");
        variable2.type = "text";
        variable2.id = `var_name${i}`;
        div.appendChild(label3);
        div.appendChild(input3);
        div.appendChild(variable2);
        break;
      case "field_number":
        let label5 = document.createElement("p");
        label5.innerHTML = "text / var name";
        let input4 = document.createElement("input");
        input4.type = "number";
        input4.id = `text${i}`;
        let variable3 = document.createElement("input");
        variable3.type = "text";
        variable3.id = `var_name${i}`;
        let br = document.createElement("br");
        let label7 = document.createElement("p");
        label7.innerHTML = "min / max / precision";
        let min = document.createElement("input");
        min.type = "number";
        min.id = `min${i}`;
        let max = document.createElement("input");
        max.type = "number";
        max.id = `max${i}`;
        let precision = document.createElement("input");
        precision.type = "number";
        precision.id = `precision${i}`;
        div.appendChild(label5);
        div.appendChild(input4);
        div.appendChild(variable3);
        div.appendChild(br);
        div.appendChild(label7);
        div.appendChild(min);
        div.appendChild(max);
        div.appendChild(precision);
        break;
      case "field_angle":
        let label0 = document.createElement("p");
        label0.innerHTML = "angle / var name";
        let input5 = document.createElement("input");
        input5.type = "text";
        input5.id = `text${i}`;
        let variable4 = document.createElement("input");
        variable4.type = "text";
        variable4.id = `var_name${i}`;
        div.appendChild(label0);
        div.appendChild(input5);
        div.appendChild(variable4);
        break;
      case "field_dropdown":
        let label11 = document.createElement("p");
        label11.innerHTML = "dropdown name";
        let dd_var = document.createElement("input");
        dd_var.type = "text";
        dd_var.id = `var_name${i}`;
        let label12 = document.createElement("p");
        label12.innerHTML = "num of items";
        let num = document.createElement("input");
        num.type = "number";
        num.id = "dd_amt";
        let butt = document.createElement("button");
        butt.innerHTML = "go";
        butt.id = "dd_butt";
        div.id = `drop${i}`;
        butt.onclick = function () {
          dropSet(i, `drop${i}`);
        };
        div.appendChild(label11);
        div.appendChild(dd_var);
        div.appendChild(label12);
        div.appendChild(num);
        div.appendChild(butt);
        break;
      case "field_checkbox":
        let label13 = document.createElement("p");
        label13.innerHTML = "true/false / var name";
        let check = document.createElement("input");
        check.type = "checkbox";
        check.id = `text${i}`;
        let variable5 = document.createElement("input");
        variable5.type = "text";
        variable5.id = `var_name${i}`;
        div.appendChild(label13);
        div.appendChild(check);
        div.appendChild(variable5);
        break;
      case "field_colour":
        let label15 = document.createElement("p");
        label15.innerHTML = "colour / var name";
        let colour = document.createElement("input");
        colour.type = "color";
        colour.id = `text${i}`;
        let variable6 = document.createElement("input");
        variable6.type = "text";
        variable6.id = `var_name${i}`;
        div.appendChild(label15);
        div.appendChild(colour);
        div.appendChild(variable6);
        break;
      case "field_variable":
        let label17 = document.createElement("p");
        label17.innerHTML = "item / var name";
        let item = document.createElement("input");
        item.type = "text";
        item.id = `text${i}`;
        let item_var = document.createElement("input");
        item_var.type = "text";
        item_var.id = `var_name${i}`;
        div.appendChild(label17);
        div.appendChild(item);
        div.appendChild(item_var);
        break;
      default:
        let tt = document.createElement("p");
        tt.innerHTML = "sldldldlldooooo";
        div.appendChild(tt);
    }
    fields_div.appendChild(div);
  }
  let temp = document.getElementById("ffff_div");
  temp.appendChild(fields_div);
}
