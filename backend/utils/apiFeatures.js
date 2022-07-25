class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }

   search() {
      //storing query key for search
      const keyword = this.queryStr.keyword ? { name: { $regex: this.queryStr.keyword, $options: 'i' } } : {};
      console.log(keyword);

      //finding product of query by this.query products,
      this.query = this.query.find({ ...keyword });

      //return apiFeature for use Search function
      return this;
   }

   filter() {
      const copyQuery = { ...this.queryStr };
      console.log(copyQuery);
      //remove all keyowrd and value without category
      const removeFields = ['limit', 'page', 'keyword'];
      removeFields.forEach((key) => {
         delete copyQuery[key];
      });
      console.log(copyQuery);
    //   { category: 'Mobile' }
    this.query = this.query.find({...copyQuery});
    return this;
   }
}

module.exports = ApiFeatures;
