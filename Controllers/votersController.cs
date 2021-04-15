using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoterSystemWebAPI.Data;
using VoterSystemWebAPI.Models;

namespace VoterSystemWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class votersController : ControllerBase
    {
        private readonly VoterSystemWebAPIContext _context;

        public votersController(VoterSystemWebAPIContext context)
        {
            _context = context;
        }

        // GET: api/voters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<voter>>> Getvoter()
        {
            return await _context.voter.ToListAsync();
        }

        // GET: api/voters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<voter>> Getvoter(int id)
        {
            var voter = await _context.voter.FindAsync(id);

            if (voter == null)
            {
                return NotFound();
            }

            return voter;
        }

        // PUT: api/voters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putvoter(int id, voter voter)
        {
            if (id != voter.Id)
            {
                return BadRequest();
            }

            _context.Entry(voter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!voterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/voters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<voter>> Postvoter(voter voter)
        {
            _context.voter.Add(voter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getvoter", new { id = voter.Id }, voter);
        }

        // DELETE: api/voters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletevoter(int id)
        {
            var voter = await _context.voter.FindAsync(id);
            if (voter == null)
            {
                return NotFound();
            }

            _context.voter.Remove(voter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool voterExists(int id)
        {
            return _context.voter.Any(e => e.Id == id);
        }
    }
}
