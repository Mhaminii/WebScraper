import React,{useState} from "react";

const Search = ({history}) => {
    const [keyword , setKeyword]=useState('')

    const searchHandler =(e)=>{
        e.preventDefault();

        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
  return (
      <form onSubmit={searchHandler} class="header_search_form clearfix">
        <input
          type="search"
          required="required"
          class="header_search_input"
          placeholder="جستوجو در پایگاه داده ..."
          onChange={(e)=>setKeyword(e.target.value)}
        />
        <button
          type="submit"
          class="header_search_button trans_300"
          value="Submit"
        >
          <img
            src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918770/search.png"
            alt=""
          />
        </button>
      </form>
  );
};

export default Search;
