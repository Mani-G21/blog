function slhttp() {
    this.get = async url => {
      const response = await fetch(url);
      if(response.ok) return await response.json();
      throw new Error(`Error: ${response.status}`);
    }
    
    this.post = async(url, data) => {
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(url, options)  
      if(response.ok) return await response.json();
      throw new Error(`Error: ${response.status}`);
    }
  
    this.put = async(url, data) => {
      const options = {
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(url, options)
      if(response.ok) return await response.json();
      throw new Error(`Error: ${response.status}`);
    }
  
    this.delete = async url => {
      const options = {
        method: 'DELETE'
      }
      const response = await fetch(url, options)
      if(response.ok) return await response.json();
      throw new Error(`Error: ${response.status}`);
    }
  }
  
  const http = new slhttp();
  export default http;