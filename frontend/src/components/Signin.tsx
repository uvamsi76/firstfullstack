import {Card,TextField,Button} from "@mui/material"
import {useState} from "react"
import {tokenState} from "../store/token"
import {useRecoilState} from "recoil"
export function Signin(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [tokenn,setTokenn]=useRecoilState(tokenState)
    const handleSignin = async () => {
        const response = await fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", data.username)
            setTokenn(data.token)
            console.log(tokenn)
            window.location.href = "/";
        } else {
            alert("Error while signing up");
        }
    };
    return(
        <div style={{paddingBottom:"44%"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexWrap:"wrap",paddingTop:"10%"}}>
                <h1 style={{padding:10 ,width:200}}>Signin page</h1>
                <Card elevation={24} style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:30 ,height:"200%",width:"20%",justifyContent:"center"}}>
                <TextField style={{margin:20}} id="outlined-basic" label="username" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}}/>
                <TextField style={{margin:20}} id="outlined-basic" label="password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
                <Button variant="contained" style={{margin:20}} onClick={handleSignin}> signin</Button>
                </Card>
            </div>
        </div>
    )
}