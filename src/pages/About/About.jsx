// import React from 'react';
// import styles from './About.module.css';

// const About = () => {
//   return (
//     <div className={styles.container}>
//       {/* Background Animation */}
//       <div className={styles.backgroundAnimation}>
//         <div className={styles.gradientOrb1}></div>
//         <div className={styles.gradientOrb2}></div>
//         <div className={styles.gradientOrb3}></div>
//         <div className={styles.gradientOrb4}></div>
//       </div>

//       {/* Header */}
//       <div className={styles.header}>
//         <h1>
//           <span className={styles.gradientText}>About</span>
//           <span className={styles.gradientText2}> Us</span>
//         </h1>
//         <p>Learn more about <span className={styles.highlight}>MyStore</span> and our mission</p>
//       </div>

//       <div className={styles.content}>
//         {/* Owner Section */}
//         <div className={styles.ownerSection}>
//           <div className={styles.ownerCard}>
//             <div className={styles.ownerImageWrapper}>
//               <img 
//                 src="https://ui-avatars.com/api/?name=Reyaz+Ahmad&size=150&background=3b82f6&color=fff&bold=true" 
//                 alt="Reyaz Ahmad"
//                 className={styles.ownerImage}
//               />
//               <div className={styles.ownerBadge}>👑</div>
//             </div>
//             <div className={styles.ownerInfo}>
//               <h2>
//                 <span className={styles.gradientText}>Mr.</span>
//                 <span className={styles.gradientText2}> Reyaz</span>
//                 <span className={styles.gradientText3}> Ahmad</span>
//               </h2>
//               <p className={styles.ownerTitle}>Founder & CEO, MyStore</p>
//               <div className={styles.ownerBio}>
//                 <p>
//                   <span className={styles.color1}>"</span>
//                   <span className={styles.color2}>Building</span>
//                   <span className={styles.color3}> dreams</span>
//                   <span className={styles.color4}> one</span>
//                   <span className={styles.color5}> product</span>
//                   <span className={styles.color6}> at</span>
//                   <span className={styles.color1}> a</span>
//                   <span className={styles.color2}> time.</span>
//                   <span className={styles.color3}>"</span>
//                 </p>
//                 <p className={styles.bioText}>
//                   <span className={styles.color4}>Passionate</span>
//                   <span className={styles.color5}> about</span>
//                   <span className={styles.color6}> creating</span>
//                   <span className={styles.color1}> a</span>
//                   <span className={styles.color2}> platform</span>
//                   <span className={styles.color3}> where</span>
//                   <span className={styles.color4}> quality</span>
//                   <span className={styles.color5}> meets</span>
//                   <span className={styles.color6}> trust.</span>
//                 </p>
//                 <p className={styles.bioText}>
//                   <span className={styles.color1}>With</span>
//                   <span className={styles.color2}> over</span>
//                   <span className={styles.color3}> 5</span>
//                   <span className={styles.color4}> years</span>
//                   <span className={styles.color5}> of</span>
//                   <span className={styles.color6}> experience</span>
//                   <span className={styles.color1}> in</span>
//                   <span className={styles.color2}> e-commerce,</span>
//                   <span className={styles.color3}> I</span>
//                   <span className={styles.color4}> believe</span>
//                   <span className={styles.color5}> in</span>
//                   <span className={styles.color6}> making</span>
//                   <span className={styles.color1}> shopping</span>
//                   <span className={styles.color2}> simple</span>
//                   <span className={styles.color3}> and</span>
//                   <span className={styles.color4}> secure.</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Our Story */}
//         <div className={styles.section}>
//           <h2>
//             <span className={styles.gradientText}>Our</span>
//             <span className={styles.gradientText2}> Story</span>
//           </h2>
//           <p>
//             <span className={styles.color1}>MyStore</span>
//             <span className={styles.color2}> was</span>
//             <span className={styles.color3}> founded</span>
//             <span className={styles.color4}> with</span>
//             <span className={styles.color5}> a</span>
//             <span className={styles.color6}> simple</span>
//             <span className={styles.color1}> vision:</span>
//             <span className={styles.color2}> to</span>
//             <span className={styles.color3}> make</span>
//             <span className={styles.color4}> quality</span>
//             <span className={styles.color5}> products</span>
//             <span className={styles.color6}> accessible</span>
//             <span className={styles.color1}> to</span>
//             <span className={styles.color2}> everyone.</span>
//           </p>
//           <p>
//             <span className={styles.color3}>Starting</span>
//             <span className={styles.color4}> from</span>
//             <span className={styles.color5}> a</span>
//             <span className={styles.color6}> small</span>
//             <span className={styles.color1}> team</span>
//             <span className={styles.color2}> of</span>
//             <span className={styles.color3}> passionate</span>
//             <span className={styles.color4}> individuals,</span>
//             <span className={styles.color5}> we've</span>
//             <span className={styles.color6}> grown</span>
//             <span className={styles.color1}> into</span>
//             <span className={styles.color2}> a</span>
//             <span className={styles.color3}> trusted</span>
//             <span className={styles.color4}> platform</span>
//             <span className={styles.color5}> serving</span>
//             <span className={styles.color6}> thousands</span>
//             <span className={styles.color1}> of</span>
//             <span className={styles.color2}> customers</span>
//             <span className={styles.color3}> worldwide.</span>
//           </p>
//         </div>

//         {/* Mission */}
//         <div className={styles.section}>
//           <h2>
//             <span className={styles.gradientText2}>Our</span>
//             <span className={styles.gradientText3}> Mission</span>
//           </h2>
//           <p>
//             <span className={styles.color4}>To</span>
//             <span className={styles.color5}> provide</span>
//             <span className={styles.color6}> a</span>
//             <span className={styles.color1}> seamless</span>
//             <span className={styles.color2}> shopping</span>
//             <span className={styles.color3}> experience</span>
//             <span className={styles.color4}> with</span>
//             <span className={styles.color5}> high-quality</span>
//             <span className={styles.color6}> products,</span>
//             <span className={styles.color1}> secure</span>
//             <span className={styles.color2}> payments,</span>
//             <span className={styles.color3}> and</span>
//             <span className={styles.color4}> exceptional</span>
//             <span className={styles.color5}> customer</span>
//             <span className={styles.color6}> service.</span>
//           </p>
//         </div>

//         {/* Stats */}
//         <div className={styles.statsGrid}>
//           <div className={styles.statCard}>
//             <span className={styles.statNumber}>10K+</span>
//             <span className={styles.statLabel}>Happy Customers</span>
//           </div>
//           <div className={styles.statCard}>
//             <span className={styles.statNumber}>500+</span>
//             <span className={styles.statLabel}>Products</span>
//           </div>
//           <div className={styles.statCard}>
//             <span className={styles.statNumber}>100%</span>
//             <span className={styles.statLabel}>Secure Payments</span>
//           </div>
//           <div className={styles.statCard}>
//             <span className={styles.statNumber}>24/7</span>
//             <span className={styles.statLabel}>Support</span>
//           </div>
//         </div>

//         {/* Team */}
//         <div className={styles.teamSection}>
//           <h2>
//             <span className={styles.gradientText3}>Meet</span>
//             <span className={styles.gradientText}> Our</span>
//             <span className={styles.gradientText2}> Team</span>
//           </h2>
//           <div className={styles.teamGrid}>
//             <div className={styles.teamCard}>
//               <div className={styles.teamAvatar}>👨‍💻</div>
//               <h3>Reyaz Ahmad</h3>
//               <p>Founder & CEO</p>
//               <span className={styles.teamBadge}>🌟</span>
//             </div>
//             <div className={styles.teamCard}>
//               <div className={styles.teamAvatar}>👩‍💻</div>
//               <h3>Jane Smith</h3>
//               <p>Head of Product</p>
//             </div>
//             <div className={styles.teamCard}>
//               <div className={styles.teamAvatar}>🧑‍💻</div>
//               <h3>Mike Johnson</h3>
//               <p>Tech Lead</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      {/* Simple Background */}
      <div className={styles.background}></div>

      {/* Header */}
      <div className={styles.header}>
        <h1>About <span className={styles.highlight}>Us</span></h1>
        <p>Learn more about <span className={styles.highlight}>MyStore</span> and our mission</p>
      </div>

      <div className={styles.content}>
        {/* Owner Section */}
        <div className={styles.ownerSection}>
          <div className={styles.ownerCard}>
            <div className={styles.ownerImageWrapper}>
              <img 
                src="https://res.cloudinary.com/dkps4k97y/image/upload/v1781417267/CodeHelp/ksi9nrp9vj3cuuejfyo9.png" 
                alt="Reyaz Ahmad"
                className={styles.ownerImage}
              />
            </div>
            <div className={styles.ownerInfo}>
              <h2>Mr. Reyaz Ahmad</h2>
              <p className={styles.ownerTitle}>Founder & CEO, MyStore</p>
              <div className={styles.ownerBio}>
                <p>
                  "Building dreams one product at a time."
                </p>
                <p className={styles.bioText}>
                  Passionate about creating a platform where quality meets trust. 
                  With over 5 years of experience in e-commerce, I believe in making 
                  shopping simple and secure for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className={styles.section}>
          <h2>Our <span className={styles.highlight}>Story</span></h2>
          <p>
            <span className={styles.brandName}>MyStore</span> was founded with a simple vision: 
            to make quality products accessible to everyone. We believe that shopping 
            should be simple, secure, and enjoyable.
          </p>
          <p>
            Starting from a small team of passionate individuals, we've grown 
            into a trusted platform serving thousands of customers worldwide.
          </p>
        </div>

        {/* Mission */}
        <div className={styles.section}>
          <h2>Our <span className={styles.highlight}>Mission</span></h2>
          <p>
            To provide a seamless shopping experience with high-quality products, 
            secure payments, and exceptional customer service.
          </p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>10K+</span>
            <span className={styles.statLabel}>Happy Customers</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Products</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Secure Payments</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>Support</span>
          </div>
        </div>

        {/* Team */}
        <div className={styles.teamSection}>
          <h2>Meet Our <span className={styles.highlight}>Team</span></h2>
          <div className={styles.teamGrid}>
            <div className={`${styles.teamCard} ${styles.teamCardHighlight}`}>
              <div className={styles.teamAvatar}>👨‍💻</div>
              <h3>Reyaz Ahmad</h3>
              <p>Founder & CEO</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamAvatar}>👩‍💻</div>
              <h3>Jane Smith</h3>
              <p>Head of Product</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamAvatar}>🧑‍💻</div>
              <h3>Mike Johnson</h3>
              <p>Tech Lead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;