import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import awsmobile from "./aws-exports"
import { getUrl } from './graphql/queries';

import axios from "axios";

Amplify.configure(awsmobile);

function App() {
  const [image_url, set_image_url] = useState("")
  const [image_file_name, set_image_file_name] = useState("")

  const [file, set_file] = useState<File | null>(null)
  const [upload_img_file_name, set_upload_img_file_name] = useState("")
  const [upload_img_url ,set_upload_img_url] = useState("")

  useEffect(()=>{
  },[])

  const handleGetURL = async (url:string)=>{
    const data:any = await API.graphql(graphqlOperation(getUrl, {key:url, method:"read", content_type:""})); 
    console.log(data);
    set_image_url(data.data.getUrl);
  }

  const handleFile = (event:any)=>{
    console.log("Get File")
    console.log(event.target.files)

    if(event.target.files.length > 0){
      set_file(event.target.files[0])
      set_upload_img_url(URL.createObjectURL(event.target.files[0]));
    }else{
      set_file(null)
      set_upload_img_url("")
    }

  }

  const uploadFile = async () => {
    console.log("Upload File")
    if(file == null || upload_img_url === ""){
      return ;
    }
    console.log(file.type)
    const data:any = await API.graphql(graphqlOperation(getUrl, {key:upload_img_file_name, method:"upload", content_type:file.type})); 
    const put_file_url = data.data.getUrl;
    console.log(put_file_url);
    try{
      const res = await axios.put(
        put_file_url,
        file,
        {
          headers: {
            'Content-Type': file.type,
          },
        }
      );

      console.log(res)
    }catch(error){
      console.log("ERROR")
      console.log(error)
    }


  }


  return (
    <div >
      <h1>AWS Test</h1>
      <div>
        <h2>READ</h2>
        <img src={image_url} width={200}></img>
        <input type="text" value={image_file_name} onChange={(e:any)=>set_image_file_name(e.target.value)}/>
        <button onClick={()=> handleGetURL(image_file_name)}>Get Image</button>

        <h2>WRITE</h2>
        <input type="file" accept="image/*" onChange={handleFile}></input><br/>
        <img src={upload_img_url} width={200}></img><br/>
        <input type="text" value={upload_img_file_name} onChange={(e:any)=>set_upload_img_file_name(e.target.value)}/>
        <button onClick={()=> uploadFile()}>Upload Image</button>
      </div>
    </div>
  );
}

export default App;
