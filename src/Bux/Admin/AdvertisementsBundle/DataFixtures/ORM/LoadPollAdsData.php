<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/10/15
 * Time: 11:18 AM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\AdvertiseBundle\Entity\PollAd;
use Bux\AdvertiseBundle\Entity\PollAdAnswer;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadPollAdsData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadPollAdsData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        for ($i = 0; $i < 30; $i++) {
//            $ad = new PollAd();
//            $ad->setTitle('test');
//            $ad->setDescription('test');
//            $ad->setQuestion('test test test?');
//            $ad->setValue($this->getReference('poll_category_tryme'));
//            $ad->setMaxClickInDay(1);
//            $ad->setValidate(true);
//            $ad->addMembership($this->getReference('lollipop'));
//            $ad->addMembership($this->getReference('try_me'));
//            $ad->addCountry($this->getReference('country_AL'));
//            $ad->addCountry($this->getReference('country_AU'));
//            $answer = new PollAdAnswer();
//            $answer->setQuestion($ad);
//            $answer->setAnswer('one');
//            $manager->persist($answer);
//            $answer = new PollAdAnswer();
//            $answer->setQuestion($ad);
//            $answer->setAnswer('two');
//            $manager->persist($answer);
//            $answer = new PollAdAnswer();
//            $answer->setQuestion($ad);
//            $answer->setAnswer('three');
//            $manager->persist($answer);
//            $answer = new PollAdAnswer();
//            $answer->setQuestion($ad);
//            $answer->setAnswer('four');
//            $manager->persist($answer);
//
//            $manager->persist($ad);
//        }
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 8;
    }
}