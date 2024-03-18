const clientPackage = require("../Database/clientPackage");
const skilletyService = require("../Database/skilletyService");
const companyJob = require("../Database/companyJob");


/* create company posting job */
const middlewareForJobPosting = async (req, res, next) => {
    const { companyId, id } = req.body;
    try {
        const isClientPackageAvailable = await clientPackage.findOne({ id: companyId, status: true });
        const isCustomizedJobPostingsFound = await skilletyService.findOne({
          id: companyId,
          serviceNames: { $in: ["Job Postings"] },
          status: true,
        }).sort({ createdAt: -1 });
  
        if (isClientPackageAvailable || isCustomizedJobPostingsFound) {
          if (isClientPackageAvailable && isClientPackageAvailable.activeJobsRemaining > 0) {
            await clientPackage.findOneAndUpdate(
              { id: companyId, status: true },
              { $inc: { activeJobsRemaining: -1 } },
              { new: true });
  
            const newCompanyPostJob = new companyJob({companyId:companyId, jobId:id});
            await newCompanyPostJob.save();
            // return res.status(201).json({ message: "Allow Job Posting" });
            next();
          } else if (isCustomizedJobPostingsFound && isCustomizedJobPostingsFound.remainings.activeJobs > 0) {
            const currentDate = new Date();
            const createdAtDate = new Date(isCustomizedJobPostingsFound.createdAt);
            const validityEndDate = new Date(createdAtDate);
            validityEndDate.setMonth(validityEndDate.getMonth() + isCustomizedJobPostingsFound.validity);
  
            console.log(validityEndDate);
            if (currentDate <= validityEndDate) {
              isCustomizedJobPostingsFound.remainings.activeJobs -= 1; 
              await isCustomizedJobPostingsFound.save();
  
              const newCompanyPostJob = new companyJob({companyId:companyId, jobId:id});
              await newCompanyPostJob.save();
              // return res.status(201).json({ message: "Allow Job Posting" });
              next();
            } else {
              isCustomizedJobPostingsFound.status = false;
              await isCustomizedJobPostingsFound.save();
              return res.status(400).json({ error: "Customized Job Postings package expired!" });
            }
          } else {
            return res.status(400).json({ error: "No Job Postings remaining in the active package!" });
          }
        } else {
          return res.status(400).json({ error: "No active package found!" });
        }
      
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  module.exports = middlewareForJobPosting;