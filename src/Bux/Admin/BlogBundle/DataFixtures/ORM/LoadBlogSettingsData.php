<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/18/14
 * Time: 5:24 PM
 */

namespace Bux\Admin\BlogBundle\DataFixtures\ORM;

use Bux\Admin\BlogBundle\Entity\BlogHeaderMenu;
use Bux\Admin\BlogBundle\Entity\BlogSettings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBlogSettingsData
 *
 * @package Bux\Admin\BlogBundle\DataFixtures\ORM
 */
class LoadBlogSettingsData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $menu = new BlogHeaderMenu();
        $menu->setName('home');
        $manager->persist($menu);

        $menu = new BlogHeaderMenu();
        $menu->setName('vision');
        $manager->persist($menu);

        $menu = new BlogHeaderMenu();
        $menu->setName('leadership');
        $manager->persist($menu);

        $menu = new BlogHeaderMenu();
        $menu->setName('system');
        $manager->persist($menu);

        $menu = new BlogHeaderMenu();
        $menu->setName('get_money');
        $manager->persist($menu);

        $settings = new BlogSettings();
        $settings->setBannerSide('312x555_blogBanner.jpg');
        $settings->setBannerBottom('960x188_blogBanner.jpg');
        $settings->setUpdatedAt(new \DateTime());
        $manager->persist($settings);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 4;
    }
} 