import axios from "axios";

var place

export const post=async(request)=>{
  const body = await request.body;
  place = body.place
var res
  let params = {
        access_key: '097d0b0b7ad2ebd8d53e0a10bbed1902',
        query: place
        };
  await axios.get('http://api.positionstack.com/v1/forward', {params})
    .then(response => {res=(response.data);})
    .catch(error => {
        console.log(error);
    });
  return { body: res, status: 200}

}
