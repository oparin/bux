<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/21/15
 * Time: 2:11 PM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\PollCategories;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadPollCategoriesData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadPollCategoriesData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $category = new PollCategories();
//        $category->setName('Tryme');
//        $category->setValue(0.01);
//        $category->setCredits(2);
////        $category->setTime(10);
//        $category->setRefEarning(true);
//        $category->setHideDescription(true);
//        $manager->persist($category);
//        $this->addReference('poll_category_tryme', $category);
//
//        $category = new PollCategories();
//        $category->setName('Lollipop Ads');
//        $category->setValue(0.03);
//        $category->setCredits(5);
////        $category->setTime(15);
//        $category->setRefEarning(true);
//        $category->setHideDescription(true);
//        $manager->persist($category);
//        $this->addReference('poll_category_lollipop', $category);
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