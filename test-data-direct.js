// Direct test of data loading
const fs = require('fs');
const path = require('path');

// Function to read and parse CSV files with proper quote handling
function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const data = [];
  
  let currentRow = '';
  let inQuotes = false;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    if (!inQuotes) {
      // Start of a new row
      currentRow = line;
      
      // Check if this line has unclosed quotes
      const quoteCount = (line.match(/"/g) || []).length;
      if (quoteCount % 2 === 1) {
        inQuotes = true;
        continue;
      }
    } else {
      // Continue building the current row
      currentRow += '\n' + line;
      
      // Check if quotes are now closed
      const quoteCount = (currentRow.match(/"/g) || []).length;
      if (quoteCount % 2 === 0) {
        inQuotes = false;
      } else {
        continue;
      }
    }
    
    // Parse the complete row
    if (currentRow.trim()) {
      const values = [];
      let current = '';
      let inFieldQuotes = false;
      
      for (let j = 0; j < currentRow.length; j++) {
        const char = currentRow[j];
        
        if (char === '"') {
          inFieldQuotes = !inFieldQuotes;
        } else if (char === ',' && !inFieldQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
  }
  
  return data;
}

// Test Libyan Songs
try {
  console.log('=== TESTING LIBYAN SONGS ===');
  const csvPath = path.join(process.cwd(), 'public', 'Data', 'Berwel Data Org', 'LibyanSongs', 'Libyan Songs.csv');
  console.log('CSV Path:', csvPath);
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  console.log('CSV Content length:', csvContent.length);
  console.log('First 200 chars:', csvContent.substring(0, 200));
  
  const rawData = parseCSV(csvContent);
  console.log('Parsed rows:', rawData.length);
  console.log('First row:', rawData[0]);
  
  const songs = rawData.map((row, index) => ({
    id: parseInt(row['Song Number']) || index + 1,
    songName: row['Song Name'] || '',
    singer: row['Singer'] || '',
    lyrics: row['Lyrics'] || '',
    lyricsStatus: row['Lyrics Status'] || '',
    writer: row['Writer'] || '',
    composer: row['Composer'] || '',
    category: row['Category'] || '',
    imageName: row['Image Name'] || '',
    year: row['Year'] || '',
    recordingStatus: row['Recording Status'] || '',
    soundcloudLink: row['SoundCloud Link'] || '',
  }));
  
  console.log('Processed songs:', songs.length);
  console.log('First song:', songs[0]);
  console.log('Songs with categories:', songs.filter(s => s.category).length);
  console.log('Unique categories:', [...new Set(songs.map(s => s.category))].slice(0, 10));
  
} catch (error) {
  console.error('Error testing Libyan Songs:', error);
}

// Test Maloof Entries
try {
  console.log('\n=== TESTING MALOOF ENTRIES ===');
  const csvPath = path.join(process.cwd(), 'public', 'Data', 'Berwel Data Org', 'MaloofEntries', 'Maloof Entries.csv');
  console.log('CSV Path:', csvPath);
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  console.log('CSV Content length:', csvContent.length);
  console.log('First 200 chars:', csvContent.substring(0, 200));
  
  const rawData = parseCSV(csvContent);
  console.log('Parsed rows:', rawData.length);
  console.log('First row:', rawData[0]);
  
  const entries = rawData.map((row, index) => ({
    id: row['Entry ID'] || `entry-${index + 1}`,
    entryNumber: parseInt(row['Entry Number']) || index + 1,
    entryName: row['Entry Name'] || '',
    entryType: row['Entry Type'] || '',
    entryRhythm: row['Entry Rhythm'] || '',
    entryLyrics: row['Entry Lyrics'] || '',
    noteImageName: row['Note Image Name'] || '',
    typeEntryImage: row['Type Entry Image'] || '',
  }));
  
  console.log('Processed entries:', entries.length);
  console.log('First entry:', entries[0]);
  console.log('Entries with types:', entries.filter(e => e.entryType).length);
  console.log('Unique entry types:', [...new Set(entries.map(e => e.entryType))].slice(0, 10));
  
} catch (error) {
  console.error('Error testing Maloof Entries:', error);
}
