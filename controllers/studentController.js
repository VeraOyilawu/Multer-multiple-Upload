const studentModel = require("../models/studentModel")
const fs = require("fs")


const createStudent = async (req, res) => {
    const { name, course } = req.body;
    const filenames = req.files["image"].map((file) => file.filename);
  
    const family = new studentModel({
      name,
      course,
      image: filenames,
    });
    try {
          const savedFamily = await family.save();
          if ( !savedFamily ) {
              res.status( 400 ).json( {
                  message: "family not saved."
              })
          } else {
              res.status( 201 ).json( {
                  message: "Family created successfully",
                  data: savedFamily
              })
          }
      } catch ( e ) {
          res.status( 500 ).json( {
              message: e.message
          })
      }
  }


const getProfiles = async(req, res) => {
    try {
        const profile = await studentModel.find()
         if (profile) {
            res.status(200).json({
                message: "student found" + profile.length,
                data: profile
            })
         } else {
            res.status(404).json({
                message: "no student found"
            })
         }
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const getProfile = async(req, res) => {
    try {
        const profile = await studentModel.findById(req.params.id)
         
        res.status(200).json({
            message: "Profile found",
            data: profile
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const updateProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await studentModel.findById( profileId );
    try {
        const {name, course} = req.body;
        const bodyData = {
            name: name || profile.name,
            course: course || profile.course,
            image: profile.image
        }

        if ( req.files && req.files[ "image" ] ) {
            const oldProfileImagePath = `upload/${ profile.image }`
            if ( fs.existsSync( oldProfileImagePath ) ) {
                fs.unlinkSync(oldProfileImagePath)
            }
            bodyData.profileImage = req.files;
        }
        const newProfileImage = await studentModel.findByIdAndUpdate( profileId, bodyData, { new: true } )
            if ( newProfileImage ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newProfileImage
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// remove a profile
const deleteProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await studentModel.findById( profileId );
    try {
           const oldImage = `upload/${profile.image}`
            if ( fs.existsSync( oldImage ) ) {
                fs.unlinkSync( oldImage )
            }
        const deletedProfile = await studentModel.findByIdAndDelete( profileId );
        if ( deletedProfile ) {
            res.status( 200 ).json( {
                message: "Deleted successfully",
                data: deletedProfile
            })
        } else {
            res.status( 404 ).json( {
                message: "Deleted unsuccessful"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

module.exports = {
    createStudent,
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile
}