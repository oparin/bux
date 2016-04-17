<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/15/15
 * Time: 11:29 AM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\VideoCategories;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadVideoCategoriesData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadVideoCategoriesData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $category = new VideoCategories();
//        $category->setName('Tryme');
//        $category->setValue(0.0010);
//        $category->setCredits(2);
//        $category->setTime(10);
//        $category->setRefEarning(true);
//        $category->setHideDescription(true);
//        $manager->persist($category);
//
//        $category = new VideoCategories();
//        $category->setName('Lollipop Ads');
//        $category->setValue(0.0300);
//        $category->setCredits(5);
//        $category->setTime(15);
//        $category->setRefEarning(true);
//        $category->setHideDescription(true);
//        $manager->persist($category);
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 7;
    }
}