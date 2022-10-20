class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }
    search(){
        const keyword=this.queryStr.keyword ?{
             title:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        } :{}
        //console.log("keyword : ",keyword)
        this.query = this.query.find({...keyword});
        return this;
    }
    // filter(){
    //     const queryCopy= {...this.queryStr};
    //     //console.log(queryCopy)
    //     //removing fields from query
    //     const removeFields =['keyword', 'limit', 'page'];
    //     removeFields.forEach(el => delete queryCopy[el])

    //     let queryStr=JSON.stringify(queryCopy);
    //     queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g , match=>`$${match}`)
    //     //console.log(queryStr)
    //     this.query=this.query.find(JSON.parse(queryStr));
    //     return this;
    // }
    // filterbytype(){
    //     const queryCopy= {...this.queryStr};
    //     //console.log(queryCopy)
    //     //removing fields from query
    //     const removeFields =['keyword', 'limit', 'page','category'];
    //     removeFields.forEach(el => delete queryCopy[el])
        
    //     this.query=this.query.find(JSON.parse(queryStr));
    //     return this;
    // }
    pagination(resPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resPerPage * (currentPage-1)

        this.query=this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports=APIFeatures;