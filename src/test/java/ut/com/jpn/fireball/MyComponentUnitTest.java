package ut.com.jpn.fireball;

import org.junit.Test;
import com.jpn.fireball.MyPluginComponent;
import com.jpn.fireball.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}