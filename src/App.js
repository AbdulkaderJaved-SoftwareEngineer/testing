import './App.css';
import Axios from "axios";
import {useEffect, useState} from 'react';
function App() {
  const [movieName,setMovieName] = useState('')
  const [review,setReviews] = useState('')
  const[movieReviewList,setMovieReviewList] = useState([])
  const[search,setSearch] = useState('')
  const[updateMovie,setUpdateMovie] = useState('')
useEffect(()=>{
Axios.get("http://localhost:3001/api/get").then((response)=>{
  console.log(response.data)
  setMovieReviewList(response.data)

})
},[])

const submitReview = () =>{
  Axios.post("http://localhost:3001/api/insert",{
   movieName:movieName,
    movieReview:review
  }).then(()=>{
    alert("Successfully Inserted the Data")
  })
}



const deleteHandle = (movie)=>{
Axios.delete(`http://localhost:3001/api/delete/${movie}`).then((response)=>{
  alert(movie+"Deleted")
  Axios.get("http://localhost:3001/api/get").then((response)=>{
  console.log(response.data)
  setMovieReviewList(response.data)

})})}

const updateHandle =()=>{
Axios.put("http://localhost:3001/api/update",{
  movieName:updateMovie
})
}



  return (
    <div className="App">
    <h1>Crud App</h1>
  <div className="form">
    
    <input type="text" name="movieName" onChange={(e)=>{
      setMovieName(e.target.value)
    }} placeholder="Enter the Movie Name"/>

    
    <input type="text" name="review" placeholder="Enter the Movie Review"
    onChange={(e)=>{setReviews(e.target.value)}}/>
    
    <button onClick={submitReview}>Submit</button>
   
  </div>

<table border={1}>
 <tr><input type="text" name="Search" placeholder="Search...." onChange={(e)=>{setSearch(e.target.value)
  console.log(search)

}}/></tr> 
<tr>
  <th>Id</th>
  <th>Name</th>
  <th>Review</th>
  <th>Operations</th>
</tr>

{
  
  movieReviewList.map((item)=>(
    <tr key={item.id}>
      <td key={item.id}>{item.id}</td>
      <td>{item.movieName}</td>
      <td>{item.movieReview}</td>
      
      <td><input type="text" name="UpdateMovie" placeholder='Enter New Name' onChange={(e)=>{setUpdateMovie(e.target.value)}}/><button onClick={updateHandle}>Update</button><button onClick={()=>{deleteHandle(item.movieName)}}>Delete</button></td>
    </tr>
  ))



  
  
}



</table>
  








    </div>
  );
}

export default App;
