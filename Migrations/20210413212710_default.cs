using Microsoft.EntityFrameworkCore.Migrations;

namespace VoterSystemWebAPI.Migrations
{
    public partial class @default : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Applicant",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "ApplicantProfileWebSite",
                table: "Applicant",
                newName: "FirstName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Applicant",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Applicant",
                newName: "ApplicantProfileWebSite");
        }
    }
}
