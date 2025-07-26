import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import img1 from '../assets/m5.jpg';
import img2 from '../assets/m4.jpeg';
import img4 from '../assets/m6.jpg';
import img3 from '../assets/dodge.jpg';
import img5 from '../assets/lamborgini.jpg';
import img6 from '../assets/domnic.jpg';
import '../Styles/Collage.css';

function Collage() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });
  const inView3 = useInView(ref3, { once: true });
  const inView4 = useInView(ref4, { once: true });
  const inView5 = useInView(ref5, { once: true });

  return (
    <div className="collage-layout">
    <div className="left-images">
  <div className="image-overlay-group">
    <motion.img
      ref={ref1}
      src={img1}
      alt="img1"
      className="vertical-image"
      initial={{ x: -100, opacity: 0 }}
      animate={inView1 ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    />
    <div className="overlay-text1">
      Nothing's sadder than locking a beast in a cage....
    </div>
    <div className="overlay-text2">
        -Domnic Toroto
    </div>
  </div>

  <div className="image-overlay-group">
  <motion.img
    ref={ref2}
    src={img2}
    alt="img2"
    className="vertical-image"
    initial={{ y: 100, opacity: 0 }}
    animate={inView2 ? { y: 0, opacity: 1 } : {}}
    transition={{ duration: 0.8, delay: 0.2 }}
  />

  {/* Image overlay on top of vertical-image */}
  <img className="overlay-img" src={img6} alt="overlay" />

  {/* Text overlay (optional) */}
<div className="overlay-text">
 Machines <br />never <br />Complain
</div>

</div>

</div>


      {/* RIGHT: img3, img4, img5 stacked vertically */}
      <div className="right-images">
        <motion.img
          ref={ref3}
          src={img3}
          alt="img3"
          className="horizontal-image"
          initial={{ x: 100, opacity: 0 }}
          animate={inView3 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        />
        <motion.img
          ref={ref4}
          src={img4}
          alt="img4"
          className="horizontal-image"
          initial={{ x: 100, opacity: 0 }}
          animate={inView4 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.img
          ref={ref5}
          src={img5}
          alt="img5"
          className="horizontal-image"
          initial={{ x: 100, opacity: 0 }}
          animate={inView5 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

export default Collage;
