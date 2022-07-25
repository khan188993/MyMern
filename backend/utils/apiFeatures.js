class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }

   //search product by name title,
   search() {
      //storing query key for search
      const keyword = this.queryStr.keyword ? { name: { $regex: this.queryStr.keyword, $options: 'i' } } : {};
      console.log(keyword);

      //finding product of query by this.query products,
      this.query = this.query.find({ ...keyword });

      //return apiFeature for use Search function
      return this;
   }

   //filter product with category and price
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

      let queryStr = JSON.stringify(copyQuery);
      console.log('after convert jsonString: ', queryStr);
      queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`);
      console.log('after replace string: ', queryStr);

      this.query = this.query.find({ ...JSON.parse(queryStr) });
      return this;
   }
}

module.exports = ApiFeatures;
