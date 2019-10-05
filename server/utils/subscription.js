import Subscription from '../models/subscriber';
import sendEmail from './emailSender';


const checkSubscription = (question) => {
    Subscription.find({ question }).populate('user')
        .then(data => {
            const message = `A new answer has been recorded for question with title: ${question.title}`;
            const subject = 'Answer alert';
            data.forEach(datum=>sendEmail(datum.user.email, subject, message));
        });
}

export default checkSubscription;
