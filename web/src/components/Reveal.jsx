import { motion, useReducedMotion } from 'framer-motion';

const Reveal = ({ children, delay = 0, y = 24, className = '', as = 'div', once = true, ...rest }) => {
    const reduceMotion = useReducedMotion();
    const MotionTag = motion[as] || motion.div;
    // `delay` is in seconds (framer-motion's unit), but callers often pass the
    // milliseconds they'd use with a CSS transition. No reveal waits 10s, so a
    // value that large is milliseconds — convert rather than hang the content.
    const delaySeconds = delay > 10 ? delay / 1000 : delay;

    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin: '-60px' }}
            transition={{ duration: 0.6, delay: delaySeconds, ease: [0.22, 1, 0.36, 1] }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

export default Reveal;

export { Reveal };
