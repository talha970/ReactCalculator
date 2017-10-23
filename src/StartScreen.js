
import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  Picker,
  View,
  Alert,
  ListView
} from 'react-native';

import store from 'react-native-simple-store';

export default class StartScreen extends Component<{}> {
constructor(){
    super();
    const ds = new ListView.DataSource({ 
        rowHasChanged: (r1, r2) => r1 !== r2 }); 
  
    this.state={
        job: 'Add',
        num1: 0,
        num2: 0,
        ans:0,
        dataSource: ds.cloneWithRows([]),
        opnumber: 0,
        arr: []
    };
    
}
componentDidMount(){
    this.getData();
}

getData(){
    
    store.get('arr')
    .then((data) =>{
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        opnumber: data.length,
        arr: data
      });
    });
    // if(this.state.opnumber!=undefined){
    //     for( i=this.state.opnumber;i>0;i--){
    //         store.get('op'+i)
    //         .then((data) =>{
    //         array.push(data)
    //         });
    //     }
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows(this.arr),
    //       });
    // }
}

onValueChange(key,value){
    console.log(this.state)
    let tempArr = this.state.arr.slice()
    let tempOpnumber = this.state.opnumber
    this.setState({job:value});

    if (tempOpnumber == 10) {
        tempArr.shift()
        tempOpnumber--;
    }

    if(tempOpnumber<10){
        tempOpnumber++;
        let op={
            left: this.state.num1,
            right: this.state.num2,
            operation: value
        }
         tempArr.push(op)
        }
        
        store.save('arr', 
            tempArr
        )
        console.log(tempArr)
        let arrayToDisplay = tempArr.slice().reverse();
        this.setState({
            opnumber: tempOpnumber,
            dataSource: this.state.dataSource.cloneWithRows(arrayToDisplay),
            arr: tempArr
          });
    switch(value){
        case 'Add':
        this.setState({
            ans: parseInt(this.state.num1) + parseInt(this.state.num2)
            
          });
         
         
          break;
          case 'Sub':
          this.setState({
              ans: parseInt(this.state.num1) - parseInt(this.state.num2)
            });
  
           
          
            break;
        case 'Mul':
            this.setState({
                ans: parseInt(this.state.num1) * parseInt(this.state.num2)
              });
             
           
              break;
       case 'Div':
              this.setState({
                  ans: parseInt(this.state.num1) / parseInt(this.state.num2)
                }); 
                
                
                break;     
       case 'Mod':
          this.setState({
                    ans: parseInt(this.state.num1) % parseInt(this.state.num2)
                  }); 
                 
                
                  break;
     case 'Log':
        if(this.state.num2=='10'){
            this.setState({
                ans: Math.log(parseInt(this.state.num1))
            });
           
         
    }
        else{
            this.setState({
                ans: Math.log(this.state.num1) / Math.LN10   });
             
        }
        break; 
    default:
        this.setState({
            ans: parseInt(this.state.num1) + parseInt(this.state.num2)
          });
          

        break;
         

    }
  

   
}





  render() {
      console.log("render")
    return (
      <View style={styles.container}>
        <TextInput
        placeholder="Enter First number"
        style={styles.input}
        keyboardType = 'numeric'
        value={this.state.num1}
        onChangeText = {(num1)=>this.setState({num1})}
        
        />
        <Picker
        selectedValue={this.state.job}
        onValueChange={this.onValueChange.bind(this,'job')}
        >
            <Picker.Item value="Add" label="Addition" />
            <Picker.Item value="Sub" label="Subtraction" />
            <Picker.Item value="Mul" label="Multiplication" />
            <Picker.Item value="Div" label="Division" />
            <Picker.Item value="Mod" label="Modulo" />
            <Picker.Item value="Log" label="Log" />

        </Picker>
        <TextInput
        placeholder="Enter Second number"
        style={styles.input}
        keyboardType = 'numeric'
        value={this.state.num2}
        onChangeText = {(num2)=>this.setState({num2})}
        
        />
        <Text>{`Result ${this.state.ans}`}</Text>
        <Text>History:</Text>
        <ListView 
        dataSource = { this.state.dataSource } 
        renderRow={(rowData) => {
if (rowData) {
    return <View style={{flex:1, flexDirection:'row'}}>
    <Text>{rowData.left }</Text>
    <Text> {rowData.operation}</Text>
    <Text> {rowData.right}</Text>
</View>
} else return <View></View>


        }
        
        
        }
      /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    
    backgroundColor: '#F5FCFF',
  },

  input: {
    height: 40,
    width: 200,
    color: '#000',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
