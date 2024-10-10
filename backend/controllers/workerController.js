const User = require("../models/admin");
const WorkerProfile = require("../models/workerProfile");
const Service = require("../models/service");
const SearchWorker = require('../externalfunction/WorkerSearch');
const path = require("path");
const fs = require("fs");
///worker profile update
exports.updateWorkerProfile = async (req, res) => {
  try {
    const { username, profile_description, area, address, servicesId ,relationship, gender,education_qualification,languages, nidnumber } =
      req.body;
    const worker = await WorkerProfile.findOne({ user: req.params.workerid });
    if (!worker) {
      return res.status(400).json({
        flag: false,
        message: "user is not found!",
      });
    }
    let servicesList = [];
    if (servicesId.length > 0) {
      servicesId.forEach((element) => {
        let result = servicesList.find((i) => i.service.toString() === element);
        if (!result) {
          servicesList.push({ service: String(element) });
        }
      });
    }
    worker.username = username;
    worker.profile_description = profile_description;
    worker.area = area;
    worker.nid_number = nidnumber || undefined;
    worker.address = address;
    worker.services = servicesList;
    worker.relationship = relationship;
    worker.gender = gender;
    worker.education_qualification = education_qualification;
    worker.languages = Array.from(new Set(languages));
    worker.save({ validateBeforeSave: false });
    res.status(200).json({
      flag: true,
      message: "profile update successfully",
      workers: await WorkerProfile.find({ role: { $eq: "worker" } }).populate(
        "user"
      ),
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

////update worker profile avatar
exports.updateWorkerProfileAvatar = async (req, res) => {
  try {
    const worker = await WorkerProfile.findOne({ user: req.params.workerid });
    if (!worker) {
      return res.status(400).json({
        flag: false,
        message: "user is not found!",
      });
    }
    const avatarpath = path.join(
      path.dirname(__dirname),
      "../backend/public/images/avatars/"
    );
    if (fs.existsSync(avatarpath + worker.avatar)) {
      fs.unlink(avatarpath + worker.avatar, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("delete successfully!");
        }
      });
    }
    worker.avatar = req.file.filename;
    worker.save({ validateBeforeSave: false });
    const workers = await WorkerProfile.find({
      role: { $eq: "worker" },
    }).populate("user  services.service");
    res.status(201).json({
      flag: true,
      message: "worker avatar update successfully",
      workers,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///update worker is free
exports.updateWorkerIsFreeController=async(req,res)=>{
  const workerProfile = await WorkerProfile.findById(req.params.profileId);
  if(!workerProfile){
    return res.status(400).json({
      flag: false,
      message: 'worker is not found'
    });
  }
  workerProfile.is_free = req.body.text;
  workerProfile.save({validateBeforeSave:false});
  res.status(200).json({
    flag: true,
    message: "worker is is free update successfully",
  });
}

//search workers
exports.getAllWorkerProfile = async (req, res) => {
  try {
    const ApiFucture = new SearchWorker(WorkerProfile.find().populate("user services.service"),req.query).search();
    const workers = await ApiFucture.query;
    res.status(201).json({
      flag: true,
      message: "workers profile getting successfully",
      workers,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//get unique client profile
exports.getUniqueWorkerProfile = async (req, res) => {
  try {
    const worker = await WorkerProfile.findOne({
      user: req.params.userid,
    }).populate("user services.service");
    res.status(201).json({
      flag: true,
      message: "worker profile getting successfully",
      worker,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///service to workers find
exports.findServiceToWorkersController = async (req, res) => {
  try {
    const workers = await WorkerProfile.find().populate(
      "user services services.service reviews"
    );
    const serviceId = Array.from(new Set(req.params.serviceId.split(",")));
    const workerLists = [];
    if (serviceId.length > 0) {
      serviceId.forEach((servic) => {
        if (workers.length > 0) {
          workers.forEach((worker) => {
            const find_wroker = worker?.services.find(
              (i) => i.service._id.toString() == servic
            );
            if (find_wroker) {
              workerLists.push(worker);
            }
          });
        }
      });
    }
    res.status(200).json({
      flag: true,
      message: "services to workers getting successfully",
      workerLists,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///workers to service   find
exports.findWorkersToServicesController = async (req, res) => {
  try {
    const workers = await WorkerProfile.find({});
    const servicesItems = await Service.find({}).populate(
      "service_category_id"
    );
    const workerProfileId = Array.from(
      new Set(req.params.profileId.split(","))
    );
    const servicesLists = [];
    if (workerProfileId.length > 0) {
      workerProfileId.forEach((worker) => {
        const worker_find = workers.find((i) => i._id.toString() == worker);
        if (worker_find) {
          if (worker_find.services.length > 0) {
            worker_find.services.forEach((ser) => {
              find_service = servicesItems.find(
                (i) => i._id.toString() == ser.service.toString()
              );
              if (find_service) {
                servicesLists.push(find_service);
              }
            });
          }
        }
      });
    }
    res.status(200).json({
      flag: true,
      message: "workers to services getting successfully",
      servicesLists,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
