const Subscriber = function(sub){
    let subscriber = sub || {};
    this.emailAddress = subscriber.EmailAddress;
    this.personalToken = subscriber.PersonalToken;
};
export default Subscriber;