using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VoterSystemWebAPI.Models
    //here add public class voter
{
    public class voter
    {
        [Key] // creating a primar key for db
        public int Id { get; set; }
        public string FirstName { get; set; }//Applicant FirstName
        public string LastName { get; set; }//Applicant LastName
        public int Age { get; set; }//Applicant age
        public string Address { get; set; }//Applicant Address
        public int Phone { get; set; }//Applicant Phone
    }
}
