import React from 'react';
import {View, Text} from 'react-native';
import {Header,Button,Spinner, CardSection} from './components/common';
import LoginForm from './components/LoginForm'
import * as firebase from 'firebase'


class App extends React.Component{
    state={loggedIn:null}
    componentWillMount(){
        firebase.initializeApp({
                apiKey: "AIzaSyBfR9uDoRp9-XrDB0YRB_QvWBV7jjki0X4",
                authDomain: "authentication-237cf.firebaseapp.com",
                databaseURL: "https://authentication-237cf.firebaseio.com",
                projectId: "authentication-237cf",
                storageBucket: "authentication-237cf.appspot.com",
                messagingSenderId: "480026344081"
              
        })

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({loggedIn:true})
            }
            else{
                this.setState({loggedIn:false})
            }
        })
    }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
            return(
                <CardSection>
                    <Button onPress={()=>{firebase.auth().signOut()}}>Log Out</Button>
                </CardSection>
            ) 
            case false:
            return(
                <LoginForm/>
            )
            default:
                return <Spinner size="large"/>
        }
    
       
    }
    render(){
        return(
            <View>
                <Header title="Authentication"/>
                     {this.renderContent()}
            </View>
        )
    }
}

export default App