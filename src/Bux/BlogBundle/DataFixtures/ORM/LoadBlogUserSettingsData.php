<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/13/15
 * Time: 11:36 AM
 */

namespace Bux\BlogBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Bux\BlogBundle\Entity\BlogUserSettings;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBlogUserSettingsData
 *
 * @package Bux\BlogBundle\DataFixtures\ORM
 */
class LoadBlogUserSettingsData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $settings = new BlogUserSettings();
//        $settings->setAvatar('image.jpg');
//        $settings->setHeader('header.jpg');
//        $settings->setUpdatedAt(new \DateTime());
//        $settings->setUser($this->getReference('user'));
//        $manager->persist($settings);
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 4;
    }
}