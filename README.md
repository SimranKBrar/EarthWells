# EarthWells
ENE 405 Project - Simran Brar


# UN SDG(s) #
** #6 Clean Water and Salination ** 

Ensure availability and sustainable management of water and sanitation for all. Specifically aiming to help Target. 6.1 described as "By 2030, achieve universal and equitable access to safe and affordable drinking water for all". 

# Project idea #

I would like to create a forum based community that can come together and share ideas and knowledge on water filters and techniques. It will be a place where experts can share applicable methods of research breakthroughs, and users can work together to adapt solutions to their needs and geographical areas.

# Project background/Business Opportunity #

Clean water is an issue that continues to persist across the world there are still areas in developed countries that don’t have access to clean drinking water. Oftentimes this due to no or poor water infrastructure. Unfortunately, the smaller the community gets the less likely it is to have reliable clean water. But there are some amazing breakthroughs in natural water filters. Natural water filters are using water filters that usually only used naturally occurring material to filter water and oftentimes do not require any electronics or motors to operate. There are many Non Governmental Organizations and Charity Organizations that are actively installing some natural filters all across the world in order to increase water security.



Earth wells will impower the user to take clean water back into their own hands, it will provide a community forum for natural water filters. The forum will provide not only knowledge on a plethora of natural water filters but the forum format will support any questions users may have. These questions could range from part modification and adaption to scalability limitations.



# Commercial

https://github.com/SimranKBrar/EarthWells/assets/77306119/1dc0c0dc-fd2c-4e89-9e33-1272bd1250de

# Project Closing Documents
- [Project Report Out and Lessons Learned](https://github.com/SimranKBrar/EarthWells/blob/939ef089461e3a5e87080e6eef82f64d9e9b37ea/Project%20Closing%20Documents/Report-Out-And-Lessons-Learned-Earth-Wells.pdf)
- [Final Project Progress Report](https://github.com/SimranKBrar/EarthWells/blob/939ef089461e3a5e87080e6eef82f64d9e9b37ea/Project%20Closing%20Documents/Earth%20Wells%20Final%20Status%20Report.pdf)
- [Addressing Ideas and Concepts Discussed in the Lectures](https://github.com/SimranKBrar/EarthWells/blob/939ef089461e3a5e87080e6eef82f64d9e9b37ea/Project%20Closing%20Documents/Concepts%20From%20Lecture%20In%20Earth%20Wells.pdf)
- [Final Presentation](https://github.com/SimranKBrar/EarthWells/blob/939ef089461e3a5e87080e6eef82f64d9e9b37ea/Project%20Closing%20Documents/Earth%20Wells%20Final%20Presentation%20Slides.pdf)
- [Commercial](https://github.com/SimranKBrar/EarthWells/blob/939ef089461e3a5e87080e6eef82f64d9e9b37ea/Project%20Closing%20Documents/Earth%20Wells%20Commercial.mp4)

# Installation

Before you begin, ensure you have the following installed:

- Node.js and npm
- React Native CLI
- MongoDB Atlas account


### SetUp

1. **Clone the Repository:**
   - Use your preferred method to clone the repository in a code editor.

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up MongoDB Atlas URL:**
   - Create an account with MongoDB Atlas.
   - Replace the space between the single quotes in the code below with your MongoDB Atlas URL. You can find this code at the bottom of the `index.js` file in the `EarthWellsServer` folder:
   ```javascript
   mongoose.connect('<Your MongoDB Atlas URL>').then(() => {
     console.log('listening on port 5000');
     app.listen(5000);
   ```

4. **Start the Backend Server:**
   - Navigate to `\Client\EarthWellsServer`.
   - Run:
     ```bash
     npm run dev
     ```

5. **Start the Frontend Server:**
   - Navigate to `\Client\EarthWells`.
   - Run:
     ```bash
     npm run dev
     ```

6. **Open Up a Browser:**
   - The app will be running at [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

Make sure to replace `<Your MongoDB Atlas URL>` with the actual URL you obtained from MongoDB Atlas. Additionally, ensure that the specified ports (5000 for the backend and 5173 for the frontend) are available and not in use by other processes on your machine.

# Project Initiallization Video #

[Project Initailization Video](https://youtu.be/b9MD6Q6DeXw)

# Other Project Documents
- [Project Initiallzation Documnets](https://github.com/SimranKBrar/EarthWells/tree/939ef089461e3a5e87080e6eef82f64d9e9b37ea/Planning%20Documents)
- [Project Status Reports](https://github.com/SimranKBrar/EarthWells/tree/939ef089461e3a5e87080e6eef82f64d9e9b37ea/Progress%20Reports)
