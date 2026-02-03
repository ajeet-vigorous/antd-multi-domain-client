import React, { useState } from "react";
import { Button, Modal } from "antd";
import { websiteName, SecoundWebsiteName } from '../../constants/global'


const Rules = () => {
    const [open, setOpen] = useState(true)

    const handleClose = () => {

        localStorage.removeItem("modalopen");
        setOpen(false)
    };
    // 

    return (
        <>
            <Modal
                open={open}
                style={{
                    top: 25,
                }}
                title={`${websiteName} Games Rules`}
                onCancel={handleClose}
                footer={
                    <Button className="gx-bg-primary gx-text-white gx-border-redius0" onClick={() => handleClose()} >
                        Close
                    </Button >
                }
                className="gx-px-3"
            >
                <div className="gx-font-weight-semi-bold">
                    <div className="gx-fs-xl gx-mb-2 gx-text-black"> प्रिय ग्राहक,</div>
                    <div className="gx-py-2">
                        {`किसी भी इवेंट या खेल का परिणाम गलती से दर्ज होने पर, उसे सही करने का अधिकार हमेशा रहेगा। परिणाम दर्ज होने के बाद से 48 से 72 घंटों के अंदर या कभी भी उस खेल या इवेंट का सही परिणाम दर्ज किया जा सकता है।

`}
                    </div>
                    <div className="gx-py-2">
                        {`
                    
यदि ग्राहक घोषित ग़लत रिजल्ट के द्वारा बड़े हुये कॉइन का यूज़ करता है तो रिजल्ट सही किए जाने पर इस्तेमाल किए गए कॉइन का भुगतान ग्राहक को ख़ुद करना पड़ेगा, या ग्राहक की आईडी से कॉइन माइनस या काट लिए जाएँगे यदि ग्राहक इन शर्तों से सहमत होता है, तो ही वह इस साइट पर बैटिंग कर सकता है।`}
                    </div>
                    <div className="gx-py-2">
                        {`
                    
इस स्थिति में बाद में किसी भी प्रकार का विवाद न तो एजेंट के साथ और न ही एजेंट के द्वारा कंपनी के साथ स्वीकार किया जाएगा। 

यदि एजेंट ने इन शर्तों को पहले ही अपने ग्राहक को बता दे , बाद में किसी भी प्रकार का तर्क या विवाद स्वीकार नहीं किया जाएगा।`}
                    </div>
                </div>
                <br />
                <div className="gx-font-weight-semi-bold">
                    <div className="gx-fs-lg gx-mb-2 gx-text-black"> Dear Client,</div>
                    {`If any event or game is entered in error, the user shall always have the right to correct it. The correct result for the game or event may be entered within 48 to 72 hours after the result has been entered or at any time.
`}
                </div>
                <div className="gx-py-2 gx-font-weight-semi-bold">
                    {`
If the Client uses the coins added by a wrong result declared, then the Client will have to pay for the coins used when the result is corrected, or the coins will be minused or deducted from the Client's ID. The Client can bet on this site only if he agrees to these terms.
`}
                </div>

                <div className="gx-py-2 gx-font-weight-semi-bold">
                    {`
In this case, no dispute of any kind will be entertained later either with the Agent or by the Agent with the Company. 

If the Agent has already informed these conditions to its Client, no argument or dispute of any kind will be entertained later.`}
                </div>
            </Modal>
 
        </>

    );
};

export default Rules;
