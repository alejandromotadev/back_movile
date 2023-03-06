import { User } from "../models/user.model.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });
    return res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting data" });
  }
};

const getEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      console.log('Not found!');
      return res.status(404).json({
        message: "Email no encontrado",
        status: 404,
      });
    } else {
      console.log(user instanceof User); // true
      console.log(user); 
      return res.status(200).json({
        message: "Email encontrado",
        status: 200,
        data: user
      });
    }
  };

  const updatePass = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      console.log('Not found!');
      return res.status(404).json({
        message: "Email no encontrado",
        status: 404,
      });
    } else {
      console.log(user instanceof User); // true
      console.log(user); 
      user.password = password;
      user.save();
      return res.status(200).json({
        message: "contrasenia actualizada",
        status: 200,
        data: user,
      });
    }
  };

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email,password } });
    if (user === null) {
      console.log('Not found!');
    } else {
      console.log(user instanceof User); // true
      console.log(user); 
      return res.status(200).json({
        message: "Login exitoso",
        status: 201,
        data: user,

      });
    }
  };
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password,
      },
    });
    if (created) {
      return res.status(201).json({
        message: "User added",
        status: 201,
        data: user,
        created,
      });
    }
    return res.status(200).json({
      message: "User already exist",
      status: 200,
      created,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding data" });
  }
};

// const updateUser = async (req, res) => {
//     const { id } = req.params
//     const { name, email, password, lastname } = req.body
//     const target = await User.findByPk(id)
//     const image = req.files?.image

//     try {
//         !target ? (res.status(404).json({ message: "User not found to update" })) : null;

//         if (image) {
//             if(target.public_image_id!=null){
//                 await deleteFile(target.public_image_id)
//             }
//             const imageRes = await uploadFileCLD(image.tempFilePath);
//             target.public_image_id = imageRes.public_id;
//             target.url_image = imageRes.secure_url;
//         }

//         name ? (target.name = name) : null
//         email ? (target.email = email) : null
//         password ? (target.password = password) : null
//         lastname ? (target.lastname = lastname) : null

//         const result = await target.save()

//         res.json({
//             message: "user updated",
//             data: result
//         })
//     } catch (error) {
//         res.status(500).json({message:"Algo falló al actualizar",data:error})
//         console.log("Error updating data")
//     }
// }

// const deleteUser = async (req, res) => {
//     const { id } = req.params

//     try {
//         const target = await User.findByPk(id,{
//             attributes: ['id', 'name', 'lastname', 'email', 'url_image', 'public_image_id']
//         });

//         if (!target) {
//             return res.status(404).json({
//                 message: "User not found"
//             })
//         }

//         const result = await deleteFile(target.public_image_id)
//         console.log(result);
//         const response = await target.destroy();

//         console.log(response);

//         res.json({
//             message: "User deleted corretly"
//         })
//     } catch (error) {
//         res.status(500).json({ message: error })
//     }

// }

const getSingleUSer = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "lastname", "email"],
      // attributes: ['id', 'name', 'lastname', 'email', 'url_image', 'public_image_id']
    });
    user
      ? res.json({
          message: "User found",
          data: user,
        })
      : res.status(404).json({
          message: "user not found",
        });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export {
  getUsers,
  createUser,
  login,
  getEmail,
  updatePass,
  // updateUser,
  // deleteUser,
  getSingleUSer,
};
