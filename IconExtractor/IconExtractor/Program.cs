using System;
using System.Linq;
using System.Text;
using System.Drawing;
using IWshRuntimeLibrary;

namespace IconExtractor
{
    class Program
    {

        static string GetArgument(string[] args, string name)
        {
            var arg = args.FirstOrDefault(w => w.Contains($"--{name}"));

            if (string.IsNullOrEmpty(arg))
            {
                return string.Empty;
            }

            var split = arg.Split('=');

            if (split.Length == 2)
            {
                return split[1];
            }

            return string.Empty;
        }

        static void Main(string[] args)
        {
            // https://msdn.microsoft.com/en-us/library/ms404308%28v=vs.110%29.aspx?f=255&MSPPError=-2147217396

            Console.InputEncoding = Encoding.UTF8;
            Console.OutputEncoding = Encoding.UTF8;

            var path = GetArgument(args, "path");
            if (string.IsNullOrEmpty(path))
            {
                Console.Error.WriteLine($"Path missing from arguments");
                Console.Error.WriteLine(string.Join(" | ", args));
                return;
            }

            try
            {
                var data = getIconAsBase64(path);
                Console.WriteLine(data);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                Console.Error.WriteLine(string.Join(" | ", args));
            }
        }

        static string getIconAsBase64(string path)
        {

            if (path.EndsWith(".lnk"))
            {
                path = getShortcutTarget(path);
            }

            var iconForPath = SystemIcons.Application;

            if (System.IO.File.Exists(path))
            {
                iconForPath = Icon.ExtractAssociatedIcon(path);
            }

            var imageConverter = new ImageConverter();
            var data = (byte[])imageConverter.ConvertTo(iconForPath.ToBitmap(), typeof(byte[]));

            return Convert.ToBase64String(data);

        }

        static string getShortcutTarget(string path)
        {

            if (!System.IO.File.Exists(path))
            {
                return "";
            }

            var shell = new WshShell();
            var lnk = (IWshShortcut)shell.CreateShortcut(path);
            return lnk.TargetPath;
        }
    }
}
