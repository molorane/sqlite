/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package io.cordova.hellocordova;

import android.os.Bundle;
import org.apache.cordova.*;

import java.io.IOException;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        try
        {
            String pName = this.getClass().getPackage().getName();
            this.copy("bible_data.db","/data/data/"+pName+"/databases/");
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }

    public void copy(String file, String folder) throws IOException
    {

        File CheckDirectory;
        CheckDirectory = new File(folder);
        if (!CheckDirectory.exists())
        {
            CheckDirectory.mkdir();
        }

        try {
            InputStream in = getApplicationContext().getAssets().open(file);
            OutputStream out = new FileOutputStream(folder + file);

            // Transfer bytes from in to out
            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) out.write(buf, 0, len);
            in.close();
            out.close();
        }
        catch(IOException e){
            e.printStackTrace();
        }

    }

}
