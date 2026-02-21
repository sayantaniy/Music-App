const jwt = require("jsonwebtoken");

const authArtist = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You dont have permission to create music" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
    console.log(err);
  }
};

const authUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token){
    return res.status(401).json({ message: "Unauthorized" });
  }

  try{

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    if(decoded.role !== "user"){
      return res.status(403).json({ message: "You dont have permission to access this resource" });
    }
    req.user = decoded;
    next();

  }catch(err){
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
    
  }
}

module.exports = { authArtist, authUser }
