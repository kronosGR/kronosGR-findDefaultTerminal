const { execSync } = require('child_process');
const os = require('os');

function getDefaultTerminal() {
  let defaultTerminal = '';

  const platform = os.platform();

  switch (platform) {
    case 'win32':
      try {
        const result = execSync(
          'reg query "HKEY_CLASSES_ROOT\\Directory\\shell\\open\\command" /ve'
        );
        const match = /.*\"(.*?)\".*/.exec(result.toString());
        if (match && match[1]) {
          defaultTerminal = match[1];
        }
      } catch (error) {
        console.error('Error while trying to get default terminal');
      }
      break;
    case 'darwin':
      defaultTerminal = 'Terminal.app';
      break;
    case 'linux':
      const desktopSession = process.env.XDG_CURRENT_DESKTOP || '';
      switch (desktopSession) {
        case 'KDE':
          defaultTerminal = 'konsole';
          break;
        case 'GNOME':
        case 'Cinammon':
        case 'Unity':
          defaultTerminal = 'gnome-terminal';
          break;
        case 'XFCE':
          defaultTerminal = 'xfce4-terminal';
          break;
        case 'LXDE':
          defaultTerminal = 'lxterminal';
          break;
        case 'MATE':
          defaultTerminal = 'mate-terminal';
          break;
        case 'Pantheon':
          defaultTerminal = 'pantheon-terminal';
          break;

        default:
          defaultTerminal = 'x-terminal-emulator';
      }
      break;
    default:
      console.error('Unsupported platform:', platform);
  }
  return defaultTerminal;
}

module.exports = getDefaultTerminal;
