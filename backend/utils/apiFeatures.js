class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }

   search() {
    //storing query key for search
      const keyword = this.queryStr.keyword ? { name: { $regex: this.queryStr.keyword, $options: 'i' } } : {};
      console.log(keyword)

      //finding product of query by this.query products,
      this.query = this.query.find({...keyword})

      //return apiFeature for use Search function 
      return this;
   }
}

module.exports = ApiFeatures;
