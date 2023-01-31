

const getRobots = async () => {
  try {
    const res = await axios.get("https://60c8ed887dafc90017ffbd56.mockapi.io/robots");
    const arr = res.data;
  } catch(e){
    console.log("ERROR!", e);
  }
}