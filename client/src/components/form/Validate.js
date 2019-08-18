const PATTERN = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$";

const Validate = (name, value) => {
   let errors = {};
   switch (name) {
      case "name":
         errors.name = value.length === 0 ? "Name field is required" : "";
         break;
      case "email":
         errors.email =
            value.length === 0
               ? "Email field is required"
               : !value.match(PATTERN)
               ? "Enter a valid email id"
               : "";
         break;
      case "password":
         errors.password =
            value.length === 0
               ? "Password field is required"
               : value.length < 6
               ? "Password must be atleast 6 characters"
               : "";
         break;
      default:
         break;
   }

   return {
      errors
   };
};

export default Validate;
